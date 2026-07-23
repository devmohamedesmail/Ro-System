import React from 'react';
import { Activity, Clock, Gauge, Thermometer, Waves } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UnitStatusBadge } from '../ui/Badge';
import type { ROUnit } from '../../types';

interface ReadingRowProps {
    label: string;
    value: string | number;
    unit: string;
    progress?: number; // 0-100
    progressColor?: string;
    highlight?: 'warn' | 'critical' | 'ok' | null;
}

function ReadingRow({ label, value, unit, progress, progressColor = 'bg-blue-500', highlight }: ReadingRowProps) {
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {label}
                </span>
                <span
                    className={cn(
                        'text-xs font-semibold tabular-nums',
                        highlight === 'critical' && 'text-red-600 dark:text-red-400',
                        highlight === 'warn' && 'text-amber-600 dark:text-amber-400',
                        highlight === 'ok' && 'text-gray-800 dark:text-gray-100',
                        !highlight && 'text-gray-700 dark:text-gray-200',
                    )}
                >
                    {value} <span className="font-normal text-gray-400 dark:text-gray-500">{unit}</span>
                </span>
            </div>
            {progress !== undefined && (
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                        className={cn('h-full rounded-full transition-all duration-500', progressColor)}
                        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                    />
                </div>
            )}
        </div>
    );
}

interface UnitCardProps {
    unit: ROUnit;
}

export function UnitCard({ unit }: UnitCardProps) {
    const isOffline = unit.status === 'stopped' || unit.status === 'maintenance';

    // Determine reading highlight levels
    const conductivityHighlight =
        unit.readings.productConductivity > 100
            ? 'critical'
            : unit.readings.productConductivity > 70
              ? 'warn'
              : 'ok';

    const pressureHighlight =
        unit.readings.feedPressure < 7
            ? 'warn'
            : unit.readings.feedPressure < 6
              ? 'critical'
              : 'ok';

    const phHighlight =
        unit.readings.ph > 8.0 || unit.readings.ph < 6.5
            ? 'critical'
            : unit.readings.ph > 7.5
              ? 'warn'
              : 'ok';

    return (
        <div
            className={cn(
                'rounded-xl border bg-white transition-shadow duration-200 hover:shadow-md',
                'dark:bg-gray-900 dark:hover:shadow-gray-950/40',
                unit.status === 'running'
                    ? 'border-gray-200 dark:border-gray-700/50'
                    : unit.status === 'warning'
                      ? 'border-amber-200 dark:border-amber-800/50'
                      : unit.status === 'maintenance'
                        ? 'border-blue-200 dark:border-blue-800/50'
                        : 'border-red-200 dark:border-red-800/50',
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <div
                        className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-lg',
                            unit.status === 'running'
                                ? 'bg-green-100 dark:bg-green-900/30'
                                : unit.status === 'warning'
                                  ? 'bg-amber-100 dark:bg-amber-900/30'
                                  : unit.status === 'maintenance'
                                    ? 'bg-blue-100 dark:bg-blue-900/30'
                                    : 'bg-red-100 dark:bg-red-900/30',
                        )}
                    >
                        <Waves
                            className={cn(
                                'h-4.5 w-4.5',
                                unit.status === 'running'
                                    ? 'text-green-600 dark:text-green-400'
                                    : unit.status === 'warning'
                                      ? 'text-amber-600 dark:text-amber-400'
                                      : unit.status === 'maintenance'
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-red-600 dark:text-red-400',
                            )}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{unit.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{unit.stationName}</p>
                    </div>
                </div>
                <UnitStatusBadge status={unit.status} animate />
            </div>

            {/* Recovery + Production */}
            {!isOffline && (
                <div className="grid grid-cols-2 gap-0 border-b border-gray-100 dark:border-gray-800">
                    <div className="border-r border-gray-100 px-5 py-3 dark:border-gray-800">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            Recovery Rate
                        </p>
                        <div className="mt-1 flex items-end gap-1">
                            <span className="text-lg font-bold tabular-nums text-gray-900 dark:text-white">
                                {unit.recoveryRate.toFixed(1)}
                            </span>
                            <span className="mb-0.5 text-xs text-gray-400">%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                            <div
                                className={cn(
                                    'h-full rounded-full transition-all duration-500',
                                    unit.recoveryRate >= 75 ? 'bg-green-500' : unit.recoveryRate >= 60 ? 'bg-amber-500' : 'bg-red-500',
                                )}
                                style={{ width: `${unit.recoveryRate}%` }}
                            />
                        </div>
                    </div>
                    <div className="px-5 py-3">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            Production
                        </p>
                        <div className="mt-1 flex items-end gap-1">
                            <span className="text-lg font-bold tabular-nums text-gray-900 dark:text-white">
                                {unit.actualProduction.toFixed(0)}
                            </span>
                            <span className="mb-0.5 text-xs text-gray-400">m³/d</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                            <div
                                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                                style={{ width: `${Math.min(100, (unit.actualProduction / unit.capacity) * 100)}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Readings Grid */}
            <div className="p-5">
                {isOffline ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Activity className="mb-2 h-8 w-8 text-gray-300 dark:text-gray-700" />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Unit {unit.status === 'maintenance' ? 'Under Maintenance' : 'Offline'}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">No live readings available</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Pressure Section */}
                        <div>
                            <div className="mb-2 flex items-center gap-1.5">
                                <Gauge className="h-3.5 w-3.5 text-gray-400" />
                                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                    Pressure (bar)
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <ReadingRow
                                    label="Feed"
                                    value={unit.readings.feedPressure.toFixed(1)}
                                    unit="bar"
                                    progress={(unit.readings.feedPressure / 12) * 100}
                                    progressColor={pressureHighlight === 'ok' ? 'bg-blue-500' : pressureHighlight === 'warn' ? 'bg-amber-500' : 'bg-red-500'}
                                    highlight={pressureHighlight}
                                />
                                <ReadingRow
                                    label="Product"
                                    value={unit.readings.productPressure.toFixed(1)}
                                    unit="bar"
                                    progress={(unit.readings.productPressure / 12) * 100}
                                    progressColor="bg-green-500"
                                    highlight="ok"
                                />
                                <ReadingRow
                                    label="Reject"
                                    value={unit.readings.rejectPressure.toFixed(1)}
                                    unit="bar"
                                    progress={(unit.readings.rejectPressure / 12) * 100}
                                    progressColor="bg-gray-400"
                                    highlight="ok"
                                />
                            </div>
                        </div>

                        {/* Flow Section */}
                        <div>
                            <div className="mb-2 flex items-center gap-1.5">
                                <Waves className="h-3.5 w-3.5 text-gray-400" />
                                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                    Flow (m³/h)
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <ReadingRow
                                    label="Feed"
                                    value={unit.readings.feedFlow.toFixed(1)}
                                    unit="m³/h"
                                    progress={(unit.readings.feedFlow / 20) * 100}
                                    progressColor="bg-blue-500"
                                    highlight="ok"
                                />
                                <ReadingRow
                                    label="Product"
                                    value={unit.readings.productFlow.toFixed(1)}
                                    unit="m³/h"
                                    progress={(unit.readings.productFlow / 20) * 100}
                                    progressColor="bg-green-500"
                                    highlight="ok"
                                />
                                <ReadingRow
                                    label="Reject"
                                    value={unit.readings.rejectFlow.toFixed(1)}
                                    unit="m³/h"
                                    progress={(unit.readings.rejectFlow / 20) * 100}
                                    progressColor="bg-gray-400"
                                    highlight="ok"
                                />
                            </div>
                        </div>

                        {/* Quality Section */}
                        <div>
                            <div className="mb-2 flex items-center gap-1.5">
                                <Activity className="h-3.5 w-3.5 text-gray-400" />
                                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                    Water Quality
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <ReadingRow
                                    label="Feed EC"
                                    value={unit.readings.feedConductivity}
                                    unit="μS/cm"
                                    progress={(unit.readings.feedConductivity / 5000) * 100}
                                    progressColor="bg-blue-400"
                                    highlight="ok"
                                />
                                <ReadingRow
                                    label="Product EC"
                                    value={unit.readings.productConductivity}
                                    unit="μS/cm"
                                    progress={(unit.readings.productConductivity / 200) * 100}
                                    progressColor={
                                        conductivityHighlight === 'ok'
                                            ? 'bg-green-500'
                                            : conductivityHighlight === 'warn'
                                              ? 'bg-amber-500'
                                              : 'bg-red-500'
                                    }
                                    highlight={conductivityHighlight}
                                />
                                <ReadingRow
                                    label="pH"
                                    value={unit.readings.ph.toFixed(1)}
                                    unit=""
                                    progress={(unit.readings.ph / 14) * 100}
                                    progressColor={
                                        phHighlight === 'ok'
                                            ? 'bg-green-500'
                                            : phHighlight === 'warn'
                                              ? 'bg-amber-500'
                                              : 'bg-red-500'
                                    }
                                    highlight={phHighlight}
                                />
                                <ReadingRow
                                    label="Temp"
                                    value={unit.readings.temperature.toFixed(1)}
                                    unit="°C"
                                    progress={(unit.readings.temperature / 45) * 100}
                                    progressColor="bg-orange-400"
                                    highlight="ok"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1.5 border-t border-gray-100 px-5 py-3 dark:border-gray-800">
                <Clock className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                    Last reading:{' '}
                    {new Date(unit.lastReadingAt).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    );
}

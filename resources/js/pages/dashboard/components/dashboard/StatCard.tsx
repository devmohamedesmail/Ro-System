import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { KpiStat } from '../../types';

interface StatCardProps {
    stat: KpiStat;
}

export function StatCard({ stat }: StatCardProps) {
    const Icon = stat.icon;
    const isPositive = stat.trend >= 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5',
                'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
                'dark:border-gray-700/50 dark:bg-gray-900 dark:hover:shadow-gray-950/60',
            )}
        >
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-5 transition-opacity group-hover:opacity-10 dark:opacity-10 dark:group-hover:opacity-20"
                style={{ background: 'radial-gradient(circle, currentColor 0%, transparent 70%)' }}
            />

            {/* Top row: Icon + Trend */}
            <div className="mb-4 flex items-start justify-between">
                <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', stat.colorClass)}>
                    <Icon className={cn('h-5 w-5', stat.iconColorClass)} />
                </div>

                <div
                    className={cn(
                        'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
                        isPositive
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                    )}
                >
                    <TrendIcon className="h-3 w-3" />
                    <span>{Math.abs(stat.trend)}%</span>
                </div>
            </div>

            {/* Value */}
            <p className="mb-0.5 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                {stat.value}
            </p>

            {/* Label */}
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>

            {/* Sub-label */}
            {stat.subLabel && (
                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{stat.subLabel}</p>
            )}
        </div>
    );
}

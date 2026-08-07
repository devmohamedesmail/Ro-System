import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RoUnitFormDialog } from './components/RoUnitFormDialog';
import {
    ArrowLeft,
    Pencil,
    Activity,
    Sliders,
    Cpu,
    Zap,
    Filter,
    Gauge,
    Wrench,
    Info,
    Layers,
    MapPin,
    Calendar,
    Building,
    CheckCircle2,
    XCircle,
} from 'lucide-react';

interface Station {
    id: number;
    name: string;
    code: string;
}

interface ReadingParameter {
    id: number;
    name: string;
    code: string;
    unit: string;
}

interface ReadingCategory {
    id: number;
    name: string;
    parameters?: ReadingParameter[];
}

interface RoUnit {
    id: number;
    station_id: number;
    station?: Station;
    name: string;
    code: string | null;
    capacity: number | null;
    description: string | null;
    serial_number: string | null;
    manufacturer: string | null;
    pressure_vessels?: number | null;
    membranes_per_vessel?: number | null;
    total_membranes?: number | null;
    membrane_model?: string | null;
    hpp_model?: string | null;
    hpp_brand?: string | null;
    hpp_power_kw?: number | null;
    feed_pump_model?: string | null;
    chemical_dosing_model?: string | null;
    sand_filters?: number | null;
    carbon_filters?: number | null;
    cartridge_filters?: number | null;
    cartridge_size?: string | null;
    design_flow?: number | null;
    recovery_rate?: number | null;
    design_pressure?: number | null;
    plc_model?: string | null;
    vfd_model?: string | null;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
    reading_categories?: ReadingCategory[];
}

interface ShowProps {
    ro_unit: RoUnit;
    stations?: Station[];
}

export default function Show({ ro_unit, stations = [] }: ShowProps) {
    const { t } = useTranslation();
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const renderValue = (
        val: string | number | null | undefined,
        unitSuffix?: string
    ) => {
        if (val === null || val === undefined || val === '') {
            return (
                <span className="inline-flex items-center text-xs text-gray-400 dark:text-gray-500 italic">
                    {t('ro-units.notSpecified')}
                </span>
            );
        }
        return (
            <span className="font-semibold text-gray-900 dark:text-white">
                {val} {unitSuffix && <span className="text-xs text-gray-500 font-normal ms-0.5">{unitSuffix}</span>}
            </span>
        );
    };

    return (
        <DashboardLayout>
            <Head title={`${ro_unit.name} (${ro_unit.code || ''}) — ${t('ro-units.unitDetails')}`} />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Back Link */}
                <div>
                    <Link
                        href="/ro-units"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                        {t('ro-units.backToUnits')}
                    </Link>
                </div>

                {/* Hero Header Card */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 dark:shadow-blue-900/30">
                                <Cpu className="h-7 w-7" />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {ro_unit.name}
                                    </h1>
                                    {ro_unit.code && (
                                        <code className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-mono font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                                            {ro_unit.code}
                                        </code>
                                    )}
                                    {ro_unit.is_active ? (
                                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-800 gap-1">
                                            <CheckCircle2 className="h-3 w-3" />
                                            {t('common.active')}
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary" className="gap-1 text-gray-500">
                                            <XCircle className="h-3 w-3" />
                                            {t('common.inactive')}
                                        </Badge>
                                    )}
                                </div>

                                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                    {ro_unit.station && (
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                            <strong className="font-medium text-gray-700 dark:text-gray-300">
                                                {ro_unit.station.name}
                                            </strong>
                                            {ro_unit.station.code && ` (${ro_unit.station.code})`}
                                        </span>
                                    )}
                                    {ro_unit.manufacturer && (
                                        <span className="flex items-center gap-1">
                                            <Building className="h-3.5 w-3.5 text-gray-400" />
                                            {ro_unit.manufacturer}
                                        </span>
                                    )}
                                    {ro_unit.created_at && (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                            {new Date(ro_unit.created_at).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            <Button
                                onClick={() => setEditDialogOpen(true)}
                                variant="outline"
                                className="flex items-center gap-2 border-gray-300 dark:border-gray-700"
                            >
                                <Pencil className="h-4 w-4" />
                                {t('ro-units.edit')}
                            </Button>

                            <Link href={`/readings/ro-unit/${ro_unit.id}`}>
                                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                                    <Activity className="h-4 w-4" />
                                    {t('ro-units.viewReadings')}
                                </Button>
                            </Link>

                            <Link href="/ro-units/settings">
                                <Button variant="secondary" className="flex items-center gap-2">
                                    <Sliders className="h-4 w-4" />
                                    {t('ro-units.ro-settings')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Highlight KPI Metric Cards */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {t('ro-units.fields.capacity')}
                        </p>
                        <p className="mt-2 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                            {ro_unit.capacity !== null && ro_unit.capacity !== undefined
                                ? `${ro_unit.capacity.toLocaleString()} m³/h`
                                : renderValue(null)}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {t('ro-units.fields.totalMembranes')}
                        </p>
                        <p className="mt-2 text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                            {ro_unit.total_membranes !== null && ro_unit.total_membranes !== undefined
                                ? ro_unit.total_membranes
                                : renderValue(null)}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {t('ro-units.fields.designFlow')}
                        </p>
                        <p className="mt-2 text-2xl font-extrabold text-teal-600 dark:text-teal-400">
                            {ro_unit.design_flow !== null && ro_unit.design_flow !== undefined
                                ? `${ro_unit.design_flow} m³/h`
                                : renderValue(null)}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {t('ro-units.fields.recoveryRate')}
                        </p>
                        <p className="mt-2 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                            {ro_unit.recovery_rate !== null && ro_unit.recovery_rate !== undefined
                                ? `${ro_unit.recovery_rate}%`
                                : renderValue(null)}
                        </p>
                    </div>
                </div>

                {/* Technical Specifications Detail Sections */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Section 1: Basic & Identification Info */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-gray-800">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                <Info className="h-4 w-4" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                {t('ro-units.sections.basicInfo')}
                            </h3>
                        </div>

                        <dl className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.name')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.name)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.code')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.code)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.station')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.station?.name)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.capacity')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.capacity, 'm³/h')}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.manufacturer')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.manufacturer)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.serialNumber')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.serial_number)}</dd>
                            </div>

                            <div className="col-span-2">
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.description')}
                                </dt>
                                <dd className="mt-1 text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {renderValue(ro_unit.description)}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Section 2: Membranes & Pressure Vessels */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-gray-800">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                                <Layers className="h-4 w-4" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                {t('ro-units.sections.membranes')}
                            </h3>
                        </div>

                        <dl className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.pressureVessels')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.pressure_vessels)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.membranesPerVessel')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.membranes_per_vessel)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.totalMembranes')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.total_membranes)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.membraneModel')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.membrane_model)}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Section 3: Pumps & Power Equipment */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-gray-800">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                                <Zap className="h-4 w-4" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                {t('ro-units.sections.pumpsAndPower')}
                            </h3>
                        </div>

                        <dl className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.feedPumpModel')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.feed_pump_model)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.hppModel')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.hpp_model)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.hppBrand')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.hpp_brand)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.hppPowerKw')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.hpp_power_kw, 'kW')}</dd>
                            </div>

                            <div className="col-span-2">
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.chemicalDosingModel')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.chemical_dosing_model)}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Section 4: Pre-treatment & Filters */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-gray-800">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
                                <Filter className="h-4 w-4" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                {t('ro-units.sections.filters')}
                            </h3>
                        </div>

                        <dl className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.sandFilters')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.sand_filters)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.carbonFilters')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.carbon_filters)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.cartridgeFilters')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.cartridge_filters)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.cartridgeSize')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.cartridge_size)}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Section 5: Design Performance Metrics */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-gray-800">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                <Gauge className="h-4 w-4" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                {t('ro-units.sections.performance')}
                            </h3>
                        </div>

                        <dl className="grid grid-cols-3 gap-y-4 gap-x-4 text-sm">
                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.designFlow')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.design_flow, 'm³/h')}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.recoveryRate')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.recovery_rate, '%')}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.designPressure')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.design_pressure, 'bar')}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Section 6: Control & Automation */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-gray-800">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                                <Wrench className="h-4 w-4" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                {t('ro-units.sections.control')}
                            </h3>
                        </div>

                        <dl className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.plcModel')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.plc_model)}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('ro-units.fields.vfdModel')}
                                </dt>
                                <dd className="mt-1">{renderValue(ro_unit.vfd_model)}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Integrated Edit Modal */}
            <RoUnitFormDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                stations={stations.length > 0 ? stations : ro_unit.station ? [ro_unit.station] : []}
                roUnit={ro_unit}
            />
        </DashboardLayout>
    );
}

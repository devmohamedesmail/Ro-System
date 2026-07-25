import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Droplets, Plus } from 'lucide-react';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { RoUnitTable } from './components/RoUnitTable';
import { RoUnitFormDialog } from './components/RoUnitFormDialog';
import useComapny from '@/hooks/use-comapny';

interface Station {
    id: number;
    name: string;
    code: string;
}

interface RoUnit {
    id: number;
    station_id: number;
    name: string;
    code: string | null;
    capacity: number | null;
    description: string | null;
    serial_number: string | null;
    manufacturer: string | null;
    is_active: boolean;
    station?: { id: number; name: string; code: string };
}

interface PageProps {
    ro_units: RoUnit[];
    stations: Station[];
}

export default function RoUnitsPage() {
    const { t } = useTranslation();
    const { ro_units, stations } = usePage().props as any as PageProps;
    const { company } = useComapny();
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <DashboardLayout>
            <Head title={`${t('ro-units.title')} — AquaRO`} />

            <div className="space-y-6 p-6">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 shadow-md shadow-cyan-200 dark:shadow-cyan-900/30">
                            <Droplets className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                {t('ro-units.title')}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {company?.name} &mdash; {t('ro-units.subtitle')}
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={() => setCreateOpen(true)}
                        className="flex items-center gap-2 shadow-sm"
                    >
                        <Plus className="h-4 w-4" />
                        {t('ro-units.create')}
                    </Button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {t('common.total')}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {ro_units?.length ?? 0}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('ro-units.title')}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {t('common.active')}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {ro_units?.filter((u) => u.is_active).length ?? 0}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('ro-units.title')}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {t('common.inactive')}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-gray-500 dark:text-gray-400">
                            {ro_units?.filter((u) => !u.is_active).length ?? 0}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('ro-units.title')}</p>
                    </div>
                </div>

                {/* Table */}
                <RoUnitTable roUnits={ro_units ?? []} stations={stations ?? []} />
            </div>

            {/* Create Dialog */}
            <RoUnitFormDialog
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                stations={stations ?? []}
            />
        </DashboardLayout>
    );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { Edit2, MapPin, Phone, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConfirmDeleteDialog } from '@/components/shared/ConfirmDeleteDialog';
import { StationFormDialog } from './StationFormDialog';

interface Station {
    id: number;
    name: string;
    code: string;
    phone: string | null;
    city: string | null;
    country: string | null;
    address: string | null;
    is_active: boolean;
    ro_units_count?: number;
}

interface StationTableProps {
    stations: Station[];
}

export function StationTable({ stations }: StationTableProps) {
    const { t } = useTranslation();
    const [editStation, setEditStation] = useState<Station | null>(null);
    const [deleteStation, setDeleteStation] = useState<Station | null>(null);
    const [deleting, setDeleting] = useState(false);

    function handleDelete() {
        if (!deleteStation) return;
        setDeleting(true);
        router.delete(`/stations/${deleteStation.id}`, {
            onSuccess: () => {
                toast.success(t('stations.deleteSuccess'));
                setDeleteStation(null);
            },
            onError: () => toast.error(t('common.error')),
            onFinish: () => setDeleting(false),
        });
    }

    if (stations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 dark:border-gray-700 dark:bg-gray-900">
                <MapPin className="mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('stations.noStations')}</p>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('stations.table.name')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('stations.table.code')}
                            </th>
                            {/* <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('stations.table.city')}
                            </th> */}
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('stations.table.phone')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('stations.table.units')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('stations.table.status')}
                            </th>
                            <th className="px-6 py-3 text-end text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('stations.table.actions')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {stations.map((station) => (
                            <tr
                                key={station.id}
                                className="transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-800/40"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/30 dark:bg-blue-900/30">
                                            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {station.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                        {station.code}
                                    </span>
                                </td>
                              
                                <td className="px-6 py-4">
                                    {station.phone ? (
                                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                            <Phone className="h-3.5 w-3.5" />
                                            {station.phone}
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                    {station.ro_units_count ?? 0}
                                </td>
                                <td className="px-6 py-4">
                                    <Badge
                                        variant={station.is_active ? 'default' : 'secondary'}
                                        className={
                                            station.is_active
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                        }
                                    >
                                        {station.is_active ? t('common.active') : t('common.inactive')}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                                            onClick={() => setEditStation(station)}
                                            title={t('common.edit')}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                                            onClick={() => setDeleteStation(station)}
                                            title={t('common.delete')}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <StationFormDialog
                open={!!editStation}
                onClose={() => setEditStation(null)}
                station={editStation}
            />

            <ConfirmDeleteDialog
                open={!!deleteStation}
                onClose={() => setDeleteStation(null)}
                onConfirm={handleDelete}
                loading={deleting}
            />
        </>
    );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { Droplets, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConfirmDeleteDialog } from '@/components/shared/ConfirmDeleteDialog';
import { RoUnitFormDialog } from './RoUnitFormDialog';

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

interface RoUnitTableProps {
    roUnits: RoUnit[];
    stations: Station[];
}

export function RoUnitTable({ roUnits, stations }: RoUnitTableProps) {
    const { t } = useTranslation();
    const [editUnit, setEditUnit] = useState<RoUnit | null>(null);
    const [deleteUnit, setDeleteUnit] = useState<RoUnit | null>(null);
    const [deleting, setDeleting] = useState(false);

    function handleDelete() {
        if (!deleteUnit) return;
        setDeleting(true);
        router.delete(`/ro-units/${deleteUnit.id}`, {
            onSuccess: () => {
                toast.success(t('ro-units.deleteSuccess'));
                setDeleteUnit(null);
            },
            onError: () => toast.error(t('common.error')),
            onFinish: () => setDeleting(false),
        });
    }

    if (roUnits.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 dark:border-gray-700 dark:bg-gray-900">
                <Droplets className="mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('ro-units.noUnits')}</p>
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
                                {t('ro-units.table.name')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('ro-units.table.code')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('ro-units.table.station')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('ro-units.table.capacity')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('ro-units.table.manufacturer')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('ro-units.table.serialNumber')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('ro-units.table.status')}
                            </th>
                            <th className="px-6 py-3 text-end text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('ro-units.table.actions')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {roUnits.map((unit) => (
                            <tr
                                key={unit.id}
                                className="transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-800/40"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                                            <Droplets className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {unit.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                        {unit.code ?? '—'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                    {unit.station?.name ?? '—'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                    {unit.capacity != null ? `${unit.capacity} m³/h` : '—'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                    {unit.manufacturer ?? '—'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                    {unit.serial_number ?? '—'}
                                </td>
                                <td className="px-6 py-4">
                                    <Badge
                                        className={
                                            unit.is_active
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                        }
                                    >
                                        {unit.is_active ? t('common.active') : t('common.inactive')}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                                            onClick={() => setEditUnit(unit)}
                                            title={t('common.edit')}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                                            onClick={() => setDeleteUnit(unit)}
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

            <RoUnitFormDialog
                open={!!editUnit}
                onClose={() => setEditUnit(null)}
                stations={stations}
                roUnit={editUnit}
            />

            <ConfirmDeleteDialog
                open={!!deleteUnit}
                onClose={() => setDeleteUnit(null)}
                onConfirm={handleDelete}
                loading={deleting}
            />
        </>
    );
}

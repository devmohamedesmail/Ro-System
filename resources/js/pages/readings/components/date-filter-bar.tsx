import React, { useState } from 'react'
import { Head, Link, router } from "@inertiajs/react";
import { CalendarDays, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import useImport from '@/hooks/use-import';

interface Filters {
    date_from?: string | null;
    date_to?: string | null;
}
export default function DateFilterBar({ roUnitId, filters }: { roUnitId: number; filters: Filters }) {
    const [dateFrom, setDateFrom] = useState(filters.date_from ?? "");
    const [dateTo, setDateTo] = useState(filters.date_to ?? "");
    const hasFilters = !!(filters.date_from || filters.date_to);
    const {t}=useImport()

    const apply = () => {
        router.visit(`/readings/ro-unit/${roUnitId}`, {
            data: {
                date_from: dateFrom || undefined,
                date_to: dateTo || undefined,
            },
            preserveScroll: false,
        });
    };

    const clear = () => {
        setDateFrom("");
        setDateTo("");
        router.visit(`/readings/ro-unit/${roUnitId}`, { preserveScroll: false });
    };

    return (
        <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <Filter className="mb-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            {/* From */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="date_from" className="text-xs">
                    {t('common.from')}
                </Label>
                <Input
                    id="date_from"
                    type="date"
                    className="h-8 w-40 text-sm"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    max={dateTo || undefined}
                />
            </div>

            {/* To */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="date_to" className="text-xs">
                    {t('common.to')}
                </Label>
                <Input
                    id="date_to"
                    type="date"
                    className="h-8 w-40 text-sm"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    min={dateFrom || undefined}
                />
            </div>

            <Button size="sm" onClick={apply} className="h-8">
                <CalendarDays className="mr-2 h-3.5 w-3.5" />
                {t('common.apply')}
            </Button>

            {hasFilters && (
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={clear}
                    className="h-8 text-muted-foreground hover:text-destructive"
                >
                    <X className="mr-1.5 h-3.5 w-3.5" />
                    {t("common.clear")}
                </Button>
            )}
        </div>
    )
}

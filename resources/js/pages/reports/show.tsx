import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useImport from '@/hooks/use-import';
import {
    ArrowLeft,
    Calendar,
    CalendarDays,
    ChevronDown,
    ChevronRight,
    ChevronUp,
    ClipboardList,
    FileText,
    Filter,
    Layers,
    Lightbulb,
    Plus,
    X,
} from 'lucide-react';

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface Parameter {
    id: number;
    reading_parameter_id: number;
    name: string;
    code: string;
    unit?: string | null;
    previous_value?: string | number | null;
    current_value?: string | number | null;
    difference?: string | number | null;
}

interface Category {
    id: number;
    name: string;
    parameters: Parameter[];
}

interface Report {
    id: number;
    report_date: string;
    actions?: string | null;
    recommendations?: string | null;
    categories: Category[];
}

interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

interface PaginatedReports {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    data: Report[];
    links: PaginationLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface RoUnit {
    id: number;
    name: string;
    code?: string | null;
}

interface Filters {
    date_from?: string | null;
    date_to?: string | null;
}

interface ShowReportsProps {
    roUnit: RoUnit;
    reports: PaginatedReports;
    filters: Filters;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ShowReports({ roUnit, reports, filters }: ShowReportsProps) {
    const { t } = useImport();
    const { data = [], current_page, last_page, total, from, to, links = [] } = reports;

    // Filter states
    const [dateFrom, setDateFrom] = useState(filters.date_from ?? '');
    const [dateTo, setDateTo] = useState(filters.date_to ?? '');
    const hasFilters = !!(filters.date_from || filters.date_to);

    const applyFilter = () => {
        router.visit(`/reports/ro-unit/${roUnit.id}`, {
            data: {
                date_from: dateFrom || undefined,
                date_to: dateTo || undefined,
            },
            preserveScroll: false,
        });
    };

    const clearFilter = () => {
        setDateFrom('');
        setDateTo('');
        router.visit(`/reports/ro-unit/${roUnit.id}`, { preserveScroll: false });
    };

    return (
        <DashboardLayout>
            <Head title={`${roUnit.name} — ${t('reports.showTitle')}`} />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Back Link & Header */}
                <div>
                    <Link
                        href="/reports"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
                    >
                        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                        {t('reports.backToReports')}
                    </Link>
                </div>

                {/* Hero Header Card */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-500/20 dark:shadow-teal-900/30">
                                <FileText className="h-7 w-7" />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {roUnit.name}
                                    </h1>
                                    {roUnit.code && (
                                        <Badge className="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 font-mono">
                                            {roUnit.code}
                                        </Badge>
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {t('reports.showTitle')} &mdash;{' '}
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{total}</span>{' '}
                                    {t('reports.reportsCount')}
                                </p>
                            </div>
                        </div>

                        <Link href="/reports">
                            <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
                                <Plus className="h-4 w-4" />
                                {t('reports.newReport')}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Date Filter Bar */}
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

                    <Button size="sm" onClick={applyFilter} className="h-8 bg-teal-600 hover:bg-teal-700 text-white">
                        <CalendarDays className="mr-2 h-3.5 w-3.5" />
                        {t('common.apply')}
                    </Button>

                    {hasFilters && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={clearFilter}
                            className="h-8 text-muted-foreground hover:text-destructive"
                        >
                            <X className="mr-1.5 h-3.5 w-3.5" />
                            {t('common.clear')}
                        </Button>
                    )}
                </div>

                {/* Daily Reports List */}
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700 bg-white dark:bg-gray-900">
                        <FileText className="mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {t('reports.noReports')}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {t('reports.noReportsSubtitle')}
                        </p>
                        <Link href="/reports" className="mt-4">
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                                <Plus className="mr-1.5 h-4 w-4" />
                                {t('reports.newReport')}
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {data.map((report, index) => (
                            <ReportCard key={report.id} report={report} index={index} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {data.length > 0 && last_page > 1 && (
                    <div className="flex flex-col items-center gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-between dark:border-gray-800">
                        <p className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-gray-900 dark:text-white">{from}–{to}</span> of{' '}
                            <span className="font-medium text-gray-900 dark:text-white">{total}</span> reports
                        </p>

                        <div className="flex items-center gap-1">
                            {links
                                .filter((l) => l.page !== null)
                                .map((link) => (
                                    <Button
                                        key={link.page}
                                        size="sm"
                                        variant={link.active ? 'default' : 'outline'}
                                        className={`h-8 min-w-[2rem] px-2 text-xs ${
                                            link.active ? 'bg-teal-600 hover:bg-teal-700' : ''
                                        }`}
                                        onClick={() => link.url && router.visit(link.url, { preserveScroll: true })}
                                    >
                                        {link.page}
                                    </Button>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

// ─── Individual Report Card Component ─────────────────────────────────────────

function ReportCard({ report, index }: { report: Report; index: number }) {
    const { t } = useImport();
    const [expanded, setExpanded] = useState(index === 0);

    const categories = report.categories || [];
    const totalParams = categories.reduce((sum, cat) => sum + (cat.parameters?.length || 0), 0);

    const formattedDate = new Date(report.report_date).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <Card className="overflow-hidden border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            {/* Header Accordion Bar */}
            <div
                onClick={() => setExpanded((v) => !v)}
                className="flex cursor-pointer flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between bg-gray-50/60 hover:bg-gray-100/60 dark:bg-gray-900/60 dark:hover:bg-gray-800/40 transition border-b border-gray-100 dark:border-gray-800"
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 font-bold">
                        #{report.id}
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                {formattedDate}
                            </h3>
                        </div>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            {report.report_date}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <Badge variant="secondary" className="gap-1 font-medium text-xs">
                        <Layers className="h-3 w-3 text-gray-500" />
                        {categories.length} {t('reports.categories') || 'Categories'} ({totalParams} {t('reports.parameter') || 'Params'})
                    </Badge>

                    {expanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                </div>
            </div>

            {/* Expandable Body */}
            {expanded && (
                <CardContent className="space-y-6 p-6">
                    {/* Section 1: Actions Taken & Recommendations Grid */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Actions Taken Box */}
                        <div className="rounded-2xl border border-teal-100 bg-teal-50/40 p-4 dark:border-teal-900/40 dark:bg-teal-950/20">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300">
                                    <ClipboardList className="h-4 w-4" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-300">
                                    {t('reports.actionsTaken')}
                                </h4>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-9 rtl:pl-0 rtl:pr-9">
                                {report.actions ? (
                                    report.actions
                                ) : (
                                    <span className="text-gray-400 dark:text-gray-500 italic text-xs">
                                        {t('reports.noActions')}
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Recommendations Box */}
                        <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                                    <Lightbulb className="h-4 w-4" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                                    {t('reports.recommendationsNotes')}
                                </h4>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-9 rtl:pl-0 rtl:pr-9">
                                {report.recommendations ? (
                                    report.recommendations
                                ) : (
                                    <span className="text-gray-400 dark:text-gray-500 italic text-xs">
                                        {t('reports.noRecommendations')}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Reading Categories & Parameter Values Tables */}
                    <div className="space-y-5 pt-2">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-900/40"
                            >
                                {/* Category Header */}
                                <div className="bg-gray-100/80 px-4 py-2.5 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
                                    <Layers className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                        {category.name}
                                    </h4>
                                </div>

                                {/* Parameter Table */}
                                <div className="p-4 overflow-x-auto">
                                    <table className="w-full text-left text-sm rtl:text-right">
                                        <thead>
                                            <tr className="border-b border-gray-200 text-xs uppercase font-semibold text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                                <th className="pb-2 pl-2 rtl:pr-2 rtl:pl-0">{t('reports.parameter')}</th>
                                                <th className="pb-2 text-center">{t('reports.previousValue')}</th>
                                                <th className="pb-2 text-center">{t('reports.currentValue')}</th>
                                                <th className="pb-2 text-center">{t('reports.difference')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {category.parameters.map((param) => {
                                                const diffVal = param.difference !== null && param.difference !== undefined ? parseFloat(String(param.difference)) : null;
                                                const isPositive = diffVal !== null && diffVal > 0;
                                                const isNegative = diffVal !== null && diffVal < 0;

                                                return (
                                                    <tr key={param.id} className="hover:bg-white/60 dark:hover:bg-gray-800/40 transition">
                                                        {/* Parameter Name & Unit */}
                                                        <td className="py-2.5 pl-2 rtl:pr-2 rtl:pl-0">
                                                            <div className="flex items-center gap-2">
                                                                <ChevronRight className="h-3.5 w-3.5 text-teal-500 shrink-0 rtl:rotate-180" />
                                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                                    {param.name}
                                                                </span>
                                                                {param.unit && (
                                                                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 font-mono dark:bg-gray-800 dark:text-gray-400">
                                                                        {param.unit}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>

                                                        {/* Previous Value */}
                                                        <td className="py-2.5 text-center font-mono text-gray-600 dark:text-gray-300">
                                                            {param.previous_value !== null && param.previous_value !== undefined && param.previous_value !== ''
                                                                ? param.previous_value
                                                                : '—'}
                                                        </td>

                                                        {/* Current Value */}
                                                        <td className="py-2.5 text-center font-mono font-bold text-gray-900 dark:text-white">
                                                            {param.current_value !== null && param.current_value !== undefined && param.current_value !== ''
                                                                ? param.current_value
                                                                : '—'}
                                                        </td>

                                                        {/* Difference Badge */}
                                                        <td className="py-2.5 text-center">
                                                            {diffVal === null || isNaN(diffVal) ? (
                                                                <span className="text-gray-400 font-mono">—</span>
                                                            ) : (
                                                                <Badge
                                                                    className={`font-mono text-xs font-bold ${
                                                                        isPositive
                                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                                                                            : isNegative
                                                                            ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300'
                                                                            : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400'
                                                                    }`}
                                                                >
                                                                    {isPositive ? `+${diffVal}` : diffVal}
                                                                </Badge>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}
        </Card>
    );
}

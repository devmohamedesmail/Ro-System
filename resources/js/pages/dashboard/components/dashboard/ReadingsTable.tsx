import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReadingStatusBadge } from '../ui/Badge';
import type { Reading, ReadingStatus } from '../../types';

const PAGE_SIZE = 5;

interface ReadingsTableProps {
    readings: Reading[];
}

export function ReadingsTable({ readings }: ReadingsTableProps) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<ReadingStatus | 'all'>('all');
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return readings.filter((r) => {
            const matchSearch =
                search === '' ||
                r.unitName.toLowerCase().includes(search.toLowerCase()) ||
                r.operator.toLowerCase().includes(search.toLowerCase()) ||
                r.stationName.toLowerCase().includes(search.toLowerCase());
            const matchStatus = statusFilter === 'all' || r.status === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [readings, search, statusFilter]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    function handleSearch(v: string) {
        setSearch(v);
        setPage(1);
    }

    function handleStatusFilter(v: ReadingStatus | 'all') {
        setStatusFilter(v);
        setPage(1);
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700/50 dark:bg-gray-900">
            {/* Header */}
            <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Recent Readings</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{filtered.length} records found</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search unit, operator…"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="h-8 rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 text-xs text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-blue-500 dark:focus:bg-gray-800"
                        />
                        {search && (
                            <button
                                onClick={() => handleSearch('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        )}
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-1">
                        {(['all', 'normal', 'warning', 'critical'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => handleStatusFilter(s)}
                                className={cn(
                                    'h-8 rounded-lg px-3 text-xs font-medium capitalize transition-colors',
                                    statusFilter === s
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
                                )}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                            {['Date', 'Time', 'Unit', 'Operator', 'Feed P.', 'Product P.', 'EC (μS)', 'pH', 'Status'].map((col) => (
                                <th
                                    key={col}
                                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="py-12 text-center text-sm text-gray-400 dark:text-gray-500">
                                    No readings match your filters
                                </td>
                            </tr>
                        ) : (
                            paginated.map((r) => (
                                <tr
                                    key={r.id}
                                    className="group transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-800/30"
                                >
                                    <td className="whitespace-nowrap px-4 py-3 text-xs tabular-nums text-gray-600 dark:text-gray-300">
                                        {r.date}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-xs tabular-nums text-gray-600 dark:text-gray-300">
                                        {r.time}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div>
                                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{r.unitName}</span>
                                            <br />
                                            <span className="text-[11px] text-gray-400 dark:text-gray-500">{r.stationName}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-300">{r.operator}</td>
                                    <td className="px-4 py-3 tabular-nums text-xs text-gray-700 dark:text-gray-200">
                                        {r.feedPressure.toFixed(1)}{' '}
                                        <span className="text-gray-400">bar</span>
                                    </td>
                                    <td className="px-4 py-3 tabular-nums text-xs text-gray-700 dark:text-gray-200">
                                        {r.productPressure.toFixed(1)}{' '}
                                        <span className="text-gray-400">bar</span>
                                    </td>
                                    <td
                                        className={cn(
                                            'px-4 py-3 tabular-nums text-xs font-medium',
                                            r.conductivity > 100
                                                ? 'text-red-600 dark:text-red-400'
                                                : r.conductivity > 70
                                                  ? 'text-amber-600 dark:text-amber-400'
                                                  : 'text-gray-700 dark:text-gray-200',
                                        )}
                                    >
                                        {r.conductivity}
                                    </td>
                                    <td
                                        className={cn(
                                            'px-4 py-3 tabular-nums text-xs font-medium',
                                            r.ph > 8.0 || r.ph < 6.5
                                                ? 'text-red-600 dark:text-red-400'
                                                : r.ph > 7.5
                                                  ? 'text-amber-600 dark:text-amber-400'
                                                  : 'text-gray-700 dark:text-gray-200',
                                        )}
                                    >
                                        {r.ph.toFixed(1)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <ReadingStatusBadge status={r.status} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="divide-y divide-gray-100 dark:divide-gray-800 md:hidden">
                {paginated.length === 0 ? (
                    <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
                        No readings match your filters
                    </div>
                ) : (
                    paginated.map((r) => (
                        <div key={r.id} className="p-4">
                            <div className="mb-2 flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                                        {r.unitName} · {r.stationName}
                                    </p>
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                        {r.date} at {r.time} · {r.operator}
                                    </p>
                                </div>
                                <ReadingStatusBadge status={r.status} />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {[
                                    { label: 'Feed P', value: `${r.feedPressure.toFixed(1)} bar` },
                                    { label: 'Product P', value: `${r.productPressure.toFixed(1)} bar` },
                                    { label: 'EC', value: `${r.conductivity} μS` },
                                    { label: 'pH', value: r.ph.toFixed(1) },
                                ].map((item) => (
                                    <div key={item.label} className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500">{item.label}</p>
                                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 dark:border-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Page {page} of {totalPages} · {filtered.length} records
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                        >
                            <ChevronLeft className="h-3.5 w-3.5" />
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={cn(
                                    'inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium transition-colors',
                                    page === i + 1
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-200 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800',
                                )}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                        >
                            <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

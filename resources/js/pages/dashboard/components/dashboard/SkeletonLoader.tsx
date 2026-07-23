import React from 'react';
import { cn } from '@/lib/utils';

// ─── Stat Card Skeleton ───────────────────────────────────────────────────────

export function StatCardSkeleton() {
    return (
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700/50 dark:bg-gray-900">
            <div className="mb-3 flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="h-5 w-12 rounded-md bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="mb-1 h-7 w-20 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-28 rounded bg-gray-100 dark:bg-gray-800/60" />
        </div>
    );
}

// ─── Unit Card Skeleton ───────────────────────────────────────────────────────

export function UnitCardSkeleton() {
    return (
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white dark:border-gray-700/50 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
                <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="grid grid-cols-2 gap-3 p-5">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-1.5">
                        <div className="h-3 w-20 rounded bg-gray-100 dark:bg-gray-800/60" />
                        <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800" />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Chart Skeleton ───────────────────────────────────────────────────────────

export function ChartSkeleton({ height = 240 }: { height?: number }) {
    return (
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700/50 dark:bg-gray-900">
            <div className="mb-4 flex items-start justify-between">
                <div className="space-y-1.5">
                    <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-3 w-48 rounded bg-gray-100 dark:bg-gray-800/60" />
                </div>
            </div>
            <div
                className="w-full rounded-lg bg-gray-100 dark:bg-gray-800/40"
                style={{ height }}
            />
        </div>
    );
}

// ─── Table Skeleton ───────────────────────────────────────────────────────────

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white dark:border-gray-700/50 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
                <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                            <div
                                key={j}
                                className={cn(
                                    'h-4 rounded bg-gray-100 dark:bg-gray-800/60',
                                    j === 0 ? 'w-20' : j === 1 ? 'w-28' : j === 2 ? 'w-16' : j === 3 ? 'flex-1' : 'w-16',
                                )}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Alert Skeleton ───────────────────────────────────────────────────────────

export function AlertSkeleton() {
    return (
        <div className="animate-pulse space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                >
                    <div className="mb-2 flex items-center gap-2">
                        <div className="h-5 w-14 rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="h-4 w-24 rounded bg-gray-100 dark:bg-gray-800/60" />
                    </div>
                    <div className="mb-1 h-4 w-48 rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-3 w-full rounded bg-gray-100 dark:bg-gray-800/60" />
                </div>
            ))}
        </div>
    );
}

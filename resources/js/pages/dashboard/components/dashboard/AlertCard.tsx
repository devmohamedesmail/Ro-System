import React, { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle, Clock, Eye, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AlertSeverityBadge } from '../ui/Badge';
import type { Alert } from '../../types';

function timeAgo(iso: string): string {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

const severityIcon = {
    critical: AlertTriangle,
    warning: Bell,
    info: Info,
};

const severityLeftBorder = {
    critical: 'border-l-red-500',
    warning: 'border-l-amber-500',
    info: 'border-l-blue-500',
};

interface AlertCardProps {
    alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
    const [dismissed, setDismissed] = useState(false);
    const [acknowledged, setAcknowledged] = useState(alert.acknowledged);

    if (dismissed) return null;

    const Icon = severityIcon[alert.severity];

    return (
        <div
            className={cn(
                'group relative rounded-xl border border-l-4 bg-white p-4 transition-all duration-200',
                'hover:shadow-sm dark:bg-gray-900',
                severityLeftBorder[alert.severity],
                alert.severity === 'critical'
                    ? 'border-gray-200 dark:border-gray-700/50'
                    : alert.severity === 'warning'
                      ? 'border-gray-200 dark:border-gray-700/50'
                      : 'border-gray-200 dark:border-gray-700/50',
                acknowledged && 'opacity-70',
            )}
        >
            {/* Top row */}
            <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                    <AlertSeverityBadge severity={alert.severity} />
                    <span className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
                        <Clock className="h-3 w-3" />
                        {timeAgo(alert.timestamp)}
                    </span>
                </div>
                <button
                    onClick={() => setDismissed(true)}
                    className="shrink-0 rounded p-0.5 text-gray-300 opacity-0 transition-opacity hover:text-gray-500 group-hover:opacity-100 dark:text-gray-600 dark:hover:text-gray-400"
                    aria-label="Dismiss alert"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            </div>

            {/* Title */}
            <p className="mb-0.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {alert.title}
            </p>

            {/* Unit & station */}
            <p className="mb-1.5 text-[11px] font-medium text-gray-500 dark:text-gray-400">
                {alert.unitName} · {alert.stationName}
            </p>

            {/* Description */}
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {alert.description}
            </p>

            {/* Actions */}
            <div className="mt-3 flex items-center gap-2">
                {!acknowledged ? (
                    <button
                        onClick={() => setAcknowledged(true)}
                        className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Acknowledge
                    </button>
                ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Acknowledged
                    </span>
                )}
                <button className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                    <Eye className="h-3.5 w-3.5" />
                    View Details
                </button>
            </div>
        </div>
    );
}

// ─── Alerts Panel ─────────────────────────────────────────────────────────────

interface AlertsPanelProps {
    alerts: Alert[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
    const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

    const filtered = filter === 'all' ? alerts : alerts.filter((a) => a.severity === filter);
    const criticalCount = alerts.filter((a) => a.severity === 'critical' && !a.acknowledged).length;
    const warningCount = alerts.filter((a) => a.severity === 'warning' && !a.acknowledged).length;

    return (
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white dark:border-gray-700/50 dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Active Alerts</h3>
                    {criticalCount > 0 && (
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                            {criticalCount}
                        </span>
                    )}
                </div>
                <a href="/alerts" className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                    View All
                </a>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 border-b border-gray-100 px-4 pt-3 dark:border-gray-800">
                {(['all', 'critical', 'warning', 'info'] as const).map((tab) => {
                    const count =
                        tab === 'all'
                            ? alerts.length
                            : alerts.filter((a) => a.severity === tab).length;
                    return (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={cn(
                                '-mb-px border-b-2 px-3 pb-2.5 text-xs font-medium capitalize transition-colors',
                                filter === tab
                                    ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                            )}
                        >
                            {tab} ({count})
                        </button>
                    );
                })}
            </div>

            {/* Alert list */}
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <CheckCircle className="mb-2 h-8 w-8 text-green-400" />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No alerts</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">All systems operating normally</p>
                    </div>
                ) : (
                    filtered.map((alert) => <AlertCard key={alert.id} alert={alert} />)
                )}
            </div>
        </div>
    );
}

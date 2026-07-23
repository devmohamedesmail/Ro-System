import React from 'react';
import { cn } from '@/lib/utils';
import type { AlertSeverity, ReadingStatus, UnitStatus } from '../../types';

// ─── Unit Status Badge ────────────────────────────────────────────────────────

const unitStatusConfig: Record<UnitStatus, { label: string; className: string; dot: string }> = {
    running: {
        label: 'Running',
        className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        dot: 'bg-green-500',
    },
    warning: {
        label: 'Warning',
        className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        dot: 'bg-amber-500',
    },
    stopped: {
        label: 'Stopped',
        className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        dot: 'bg-red-500',
    },
    maintenance: {
        label: 'Maintenance',
        className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        dot: 'bg-blue-500',
    },
};

interface UnitStatusBadgeProps {
    status: UnitStatus;
    animate?: boolean;
    className?: string;
}

export function UnitStatusBadge({ status, animate = false, className }: UnitStatusBadgeProps) {
    const config = unitStatusConfig[status];
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                config.className,
                className,
            )}
        >
            <span
                className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    config.dot,
                    animate && status === 'running' && 'animate-pulse',
                )}
            />
            {config.label}
        </span>
    );
}

// ─── Alert Severity Badge ─────────────────────────────────────────────────────

const alertSeverityConfig: Record<AlertSeverity, { label: string; className: string }> = {
    critical: {
        label: 'Critical',
        className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800',
    },
    warning: {
        label: 'Warning',
        className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
    },
    info: {
        label: 'Info',
        className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    },
};

interface AlertSeverityBadgeProps {
    severity: AlertSeverity;
    className?: string;
}

export function AlertSeverityBadge({ severity, className }: AlertSeverityBadgeProps) {
    const config = alertSeverityConfig[severity];
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wider',
                config.className,
                className,
            )}
        >
            {config.label}
        </span>
    );
}

// ─── Reading Status Badge ─────────────────────────────────────────────────────

const readingStatusConfig: Record<ReadingStatus, { label: string; className: string }> = {
    normal: {
        label: 'Normal',
        className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    },
    warning: {
        label: 'Warning',
        className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    },
    critical: {
        label: 'Critical',
        className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    },
};

interface ReadingStatusBadgeProps {
    status: ReadingStatus;
    className?: string;
}

export function ReadingStatusBadge({ status, className }: ReadingStatusBadgeProps) {
    const config = readingStatusConfig[status];
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                config.className,
                className,
            )}
        >
            {config.label}
        </span>
    );
}

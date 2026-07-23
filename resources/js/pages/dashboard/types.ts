import type { LucideIcon } from 'lucide-react';

// ─── Domain Entities ──────────────────────────────────────────────────────────

export interface Company {
    id: string;
    name: string;
    logoInitials: string;
}

export interface Station {
    id: string;
    name: string;
    companyId: string;
    location: string;
    unitCount: number;
}

export type UnitStatus = 'running' | 'warning' | 'stopped' | 'maintenance';

export interface UnitReadings {
    feedPressure: number; // bar
    productPressure: number; // bar
    rejectPressure: number; // bar
    feedFlow: number; // m³/h
    productFlow: number; // m³/h
    rejectFlow: number; // m³/h
    feedConductivity: number; // μS/cm
    productConductivity: number; // μS/cm
    ph: number;
    temperature: number; // °C
}

export interface ROUnit {
    id: string;
    name: string;
    stationId: string;
    stationName: string;
    companyId: string;
    status: UnitStatus;
    readings: UnitReadings;
    recoveryRate: number; // %
    lastReadingAt: string; // ISO date string
    capacity: number; // m³/day design capacity
    actualProduction: number; // m³/day
}

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Alert {
    id: string;
    severity: AlertSeverity;
    unitId: string;
    unitName: string;
    stationName: string;
    title: string;
    description: string;
    timestamp: string; // ISO date string
    acknowledged: boolean;
}

export type ReadingStatus = 'normal' | 'warning' | 'critical';

export interface Reading {
    id: string;
    date: string;
    time: string;
    unitId: string;
    unitName: string;
    stationName: string;
    operator: string;
    feedPressure: number;
    productPressure: number;
    conductivity: number;
    ph: number;
    status: ReadingStatus;
}

// ─── KPI Cards ────────────────────────────────────────────────────────────────

export interface KpiStat {
    id: string;
    label: string;
    value: string;
    subLabel?: string;
    icon: LucideIcon;
    trend: number; // positive = up, negative = down
    colorClass: string; // Tailwind icon bg color
    iconColorClass: string; // Tailwind icon color
}

// ─── Chart Data ───────────────────────────────────────────────────────────────

export interface ChartDataPoint {
    time: string;
    [key: string]: number | string;
}

// ─── Sidebar Nav ──────────────────────────────────────────────────────────────

export interface SidebarNavItem {
    key: string;
    label: string;
    href: string;
    icon: LucideIcon;
    badge?: number;
    activeUrls?: string[];
}

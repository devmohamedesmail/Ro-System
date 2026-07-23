import React from 'react';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Activity, RefreshCw } from 'lucide-react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { StatCard } from './components/dashboard/StatCard';
import { UnitCard } from './components/dashboard/UnitCard';
import {
    ProductionChart,
    PressureChart,
    ConductivityChart,
    WaterQualityChart,
    DailyPerformanceChart,
} from './components/dashboard/ChartCard';
import { AlertsPanel } from './components/dashboard/AlertCard';
import { ReadingsTable } from './components/dashboard/ReadingsTable';
import { mockKpiStats, mockROUnits, mockAlerts, mockReadings } from './data/mock';

export default function Dashboard() {
    const { t } = useTranslation();

    const now = new Date().toLocaleString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <DashboardLayout>
            <Head title="Dashboard — AquaRO" />

           
        </DashboardLayout>
    );
}

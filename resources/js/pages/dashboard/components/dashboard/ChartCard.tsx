import React from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useAppearance } from '@/hooks/use-appearance';
import {
    conductivityChartData,
    dailyPerformanceData,
    pressureChartData,
    productionChartData,
    waterQualityChartData,
} from '../../data/mock';

// ─── Shared Chart Theme ───────────────────────────────────────────────────────

function useChartColors(isDark: boolean) {
    return {
        grid: isDark ? '#1f2937' : '#f3f4f6',
        tick: isDark ? '#6b7280' : '#9ca3af',
        tooltip: {
            bg: isDark ? '#111827' : '#ffffff',
            border: isDark ? '#1f2937' : '#e5e7eb',
            text: isDark ? '#f9fafb' : '#111827',
        },
    };
}

const sharedAxisProps = {
    tick: { fontSize: 11 },
    tickLine: false,
    axisLine: false,
};

interface ChartCardProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    children: React.ReactNode;
}

function ChartCard({ title, subtitle, action, children }: ChartCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700/50 dark:bg-gray-900">
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                    {subtitle && (
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
                    )}
                </div>
                {action}
            </div>
            {children}
        </div>
    );
}

// ─── Production Overview ──────────────────────────────────────────────────────

export function ProductionChart() {
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';
    const colors = useChartColors(isDark);

    return (
        <ChartCard
            title="Production Overview"
            subtitle="m³/h output per unit — last 12 hours"
        >
            <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={productionChartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="prodGrad1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="prodGrad2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis dataKey="time" stroke={colors.tick} {...sharedAxisProps} />
                    <YAxis stroke={colors.tick} {...sharedAxisProps} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: colors.tooltip.bg,
                            border: `1px solid ${colors.tooltip.border}`,
                            borderRadius: '10px',
                            color: colors.tooltip.text,
                            fontSize: 12,
                        }}
                        cursor={{ stroke: colors.grid, strokeWidth: 1 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, color: colors.tick }} />
                    <Area type="monotone" dataKey="RO-01" stroke="#3b82f6" fill="url(#prodGrad1)" strokeWidth={2} dot={false} />
                    <Area type="monotone" dataKey="RO-02" stroke="#10b981" fill="url(#prodGrad2)" strokeWidth={2} dot={false} />
                    <Area type="monotone" dataKey="RO-03" stroke="#f59e0b" strokeWidth={2} fill="none" strokeDasharray="5 5" dot={false} />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

// ─── Pressure Trend ───────────────────────────────────────────────────────────

export function PressureChart() {
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';
    const colors = useChartColors(isDark);

    return (
        <ChartCard
            title="Pressure Trend"
            subtitle="Bar pressure — last 7 days (RO-01 average)"
        >
            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={pressureChartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis dataKey="time" stroke={colors.tick} {...sharedAxisProps} />
                    <YAxis domain={[3, 10]} stroke={colors.tick} {...sharedAxisProps} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: colors.tooltip.bg,
                            border: `1px solid ${colors.tooltip.border}`,
                            borderRadius: '10px',
                            color: colors.tooltip.text,
                            fontSize: 12,
                        }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, color: colors.tick }} />
                    <Line type="monotone" dataKey="feedPressure" name="Feed Pressure" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="productPressure" name="Product Pressure" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="rejectPressure" name="Reject Pressure" stroke="#6b7280" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

// ─── Conductivity Trend ───────────────────────────────────────────────────────

export function ConductivityChart() {
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';
    const colors = useChartColors(isDark);

    return (
        <ChartCard
            title="Conductivity Trend"
            subtitle="μS/cm — last 7 days"
        >
            <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={conductivityChartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis dataKey="time" stroke={colors.tick} {...sharedAxisProps} />
                    <YAxis yAxisId="left" stroke={colors.tick} {...sharedAxisProps} />
                    <YAxis yAxisId="right" orientation="right" stroke={colors.tick} {...sharedAxisProps} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: colors.tooltip.bg,
                            border: `1px solid ${colors.tooltip.border}`,
                            borderRadius: '10px',
                            color: colors.tooltip.text,
                            fontSize: 12,
                        }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, color: colors.tick }} />
                    <Bar yAxisId="left" dataKey="feedConductivity" name="Feed EC" fill="#93c5fd" opacity={0.7} radius={[3, 3, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="productConductivity" name="Product EC" stroke="#f87171" strokeWidth={2.5} dot={{ r: 3, fill: '#f87171' }} activeDot={{ r: 5 }} />
                </ComposedChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

// ─── Water Quality Trend ──────────────────────────────────────────────────────

export function WaterQualityChart() {
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';
    const colors = useChartColors(isDark);

    return (
        <ChartCard
            title="Water Quality Trend"
            subtitle="pH, Temperature & Recovery — weekly"
        >
            <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={waterQualityChartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis dataKey="time" stroke={colors.tick} {...sharedAxisProps} />
                    <YAxis yAxisId="left" domain={[6, 9]} stroke={colors.tick} {...sharedAxisProps} />
                    <YAxis yAxisId="right" orientation="right" domain={[50, 90]} stroke={colors.tick} {...sharedAxisProps} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: colors.tooltip.bg,
                            border: `1px solid ${colors.tooltip.border}`,
                            borderRadius: '10px',
                            color: colors.tooltip.text,
                            fontSize: 12,
                        }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, color: colors.tick }} />
                    <Line yAxisId="left" type="monotone" dataKey="ph" name="pH" stroke="#a78bfa" strokeWidth={2} dot={{ r: 3, fill: '#a78bfa' }} activeDot={{ r: 5 }} />
                    <Line yAxisId="left" type="monotone" dataKey="temperature" name="Temp (°C)" stroke="#fb923c" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    <Bar yAxisId="right" dataKey="recoveryRate" name="Recovery %" fill="#34d399" opacity={0.6} radius={[3, 3, 0, 0]} />
                </ComposedChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

// ─── Daily Performance ────────────────────────────────────────────────────────

export function DailyPerformanceChart() {
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';
    const colors = useChartColors(isDark);

    return (
        <ChartCard
            title="Daily Performance"
            subtitle="m³/day production vs. target — this week"
        >
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={dailyPerformanceData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis dataKey="time" stroke={colors.tick} {...sharedAxisProps} />
                    <YAxis domain={[0, 2500]} stroke={colors.tick} {...sharedAxisProps} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: colors.tooltip.bg,
                            border: `1px solid ${colors.tooltip.border}`,
                            borderRadius: '10px',
                            color: colors.tooltip.text,
                            fontSize: 12,
                        }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, color: colors.tick }} />
                    <Bar dataKey="production" name="Actual (m³)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" name="Target (m³)" fill={isDark ? '#374151' : '#e5e7eb'} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

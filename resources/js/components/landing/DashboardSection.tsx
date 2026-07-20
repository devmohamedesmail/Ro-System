import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    Activity,
    AlertTriangle,
    CheckCircle,
    Droplets,
    Gauge,
    BarChart3,
    ClipboardList,
    Wifi,
    TrendingDown,
    TrendingUp,
    Circle,
} from 'lucide-react';

// ─── Small Bar Chart ──────────────────────────────────────────────────────────
function SmallBarChart({ data, color }: { data: number[]; color: string }) {
    const max = Math.max(...data);
    return (
        <div className="flex items-end gap-0.5 h-10">
            {data.map((v, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(v / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
                    className={`flex-1 rounded-t-sm ${color}`}
                />
            ))}
        </div>
    );
}

// ─── Sparkline SVG ────────────────────────────────────────────────────────────
function Sparkline({ values, color }: { values: number[]; color: string }) {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const w = 80;
    const h = 32;
    const points = values
        .map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / range) * h}`)
        .join(' ');
    return (
        <svg width={w} height={h} className="overflow-visible">
            <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ─── Status Row ───────────────────────────────────────────────────────────────
function StatusRow({ label, status, value }: { label: string; status: 'ok' | 'warn' | 'alert'; value: string }) {
    const map = {
        ok: { dot: 'bg-emerald-400', text: 'text-emerald-600 dark:text-emerald-400' },
        warn: { dot: 'bg-amber-400', text: 'text-amber-600 dark:text-amber-400' },
        alert: { dot: 'bg-red-400', text: 'text-red-600 dark:text-red-400' },
    };
    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${map[status].dot} ${status !== 'ok' ? 'animate-pulse' : ''}`} />
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{label}</span>
            </div>
            <span className={`text-xs font-bold ${map[status].text}`}>{value}</span>
        </div>
    );
}

// ─── Dashboard Preview Section ────────────────────────────────────────────────
export default function DashboardSection() {
    const { t } = useTranslation();

    return (
        <section id="dashboard" className="py-24 lg:py-32 bg-white dark:bg-slate-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-medium mb-5"
                    >
                        {t('landing.dashboard.badge')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5"
                    >
                        {t('landing.dashboard.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 dark:text-slate-400"
                    >
                        {t('landing.dashboard.subtitle')}
                    </motion.p>
                </div>

                {/* Full Dashboard Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="relative"
                >
                    {/* Glow */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-teal-400/10 via-cyan-300/5 to-transparent rounded-3xl blur-2xl" />

                    {/* Desktop Frame */}
                    <div className="relative rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
                        {/* Window Chrome */}
                        <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                            <span className="w-3 h-3 rounded-full bg-red-400/80" />
                            <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                            <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                            <div className="mx-4 flex-1 max-w-sm h-5 rounded-md bg-slate-200/60 dark:bg-slate-700/60 flex items-center px-3">
                                <span className="text-[10px] text-slate-400">app.rosystem.io/dashboard</span>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">{t('landing.hero.mock.live')}</span>
                                </div>
                                <Wifi className="w-4 h-4 text-teal-500" />
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="flex min-h-[500px]">
                            {/* Sidebar */}
                            <div className="hidden md:flex w-48 flex-col border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 p-3 gap-1">
                                {[
                                    { icon: BarChart3, label: t('landing.dashboard.nav.overview'), active: true },
                                    { icon: Droplets, label: t('landing.dashboard.nav.units'), active: false },
                                    { icon: Activity, label: t('landing.dashboard.nav.readings'), active: false },
                                    { icon: AlertTriangle, label: t('landing.dashboard.nav.alerts'), active: false },
                                    { icon: ClipboardList, label: t('landing.dashboard.nav.reports'), active: false },
                                ].map(({ icon: Icon, label, active }) => (
                                    <div
                                        key={label}
                                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-default ${
                                            active
                                                ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400'
                                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" strokeWidth={active ? 2.5 : 1.8} />
                                        <span className="text-xs font-medium">{label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Main Panel */}
                            <div className="flex-1 p-6 space-y-5 overflow-hidden">
                                {/* KPI row */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                    {[
                                        { icon: Droplets, label: t('landing.dashboard.kpi.units'), value: '24', sub: t('landing.dashboard.kpi.active'), color: 'bg-teal-500', trend: 'up' },
                                        { icon: Activity, label: t('landing.dashboard.kpi.readings'), value: '1,248', sub: t('landing.dashboard.kpi.today'), color: 'bg-blue-500', trend: 'up' },
                                        { icon: AlertTriangle, label: t('landing.dashboard.kpi.alerts'), value: '3', sub: t('landing.dashboard.kpi.pending'), color: 'bg-amber-500', trend: 'down' },
                                        { icon: CheckCircle, label: t('landing.dashboard.kpi.compliance'), value: '98.2%', sub: t('landing.dashboard.kpi.monthly'), color: 'bg-emerald-500', trend: 'up' },
                                    ].map(({ icon: Icon, label, value, sub, color, trend }) => (
                                        <div
                                            key={label}
                                            className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-4 shadow-sm"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
                                                    <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                                                </div>
                                                {trend === 'up' ? (
                                                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                                                ) : (
                                                    <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                                                )}
                                            </div>
                                            <p className="text-xl font-extrabold text-slate-900 dark:text-white">{value}</p>
                                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500">{sub}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Charts + Status row */}
                                <div className="grid lg:grid-cols-3 gap-4">
                                    {/* Chart card */}
                                    <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-5 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t('landing.dashboard.chart.title')}</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{t('landing.dashboard.chart.sub')}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                {['1W', '1M', '3M'].map((p, i) => (
                                                    <button key={p} className={`px-2 py-0.5 rounded text-[10px] font-medium ${i === 0 ? 'bg-teal-500 text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                                                        {p}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <p className="text-[10px] text-slate-400 mb-1">{t('landing.hero.mock.tds')}</p>
                                                <SmallBarChart data={[120, 135, 128, 142, 127, 138, 130]} color="bg-teal-400" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 mb-1">{t('landing.hero.mock.pressure')}</p>
                                                <SmallBarChart data={[6.1, 6.4, 5.9, 6.2, 6.5, 6.0, 6.3]} color="bg-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 mb-1">{t('landing.hero.mock.ph')}</p>
                                                <SmallBarChart data={[7.2, 7.5, 7.3, 7.4, 7.6, 7.1, 7.4]} color="bg-purple-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status card */}
                                    <div className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-5 shadow-sm">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">{t('landing.dashboard.status.title')}</h4>
                                        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                            <StatusRow label={t('landing.dashboard.status.unit1')} status="ok" value="Online" />
                                            <StatusRow label={t('landing.dashboard.status.unit2')} status="ok" value="Online" />
                                            <StatusRow label={t('landing.dashboard.status.unit3')} status="warn" value="Warning" />
                                            <StatusRow label={t('landing.dashboard.status.unit4')} status="alert" value="Alert" />
                                            <StatusRow label={t('landing.dashboard.status.unit5')} status="ok" value="Online" />
                                        </div>
                                    </div>
                                </div>

                                {/* Recent readings table */}
                                <div className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 shadow-sm overflow-hidden">
                                    <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t('landing.dashboard.table.title')}</h4>
                                        <button className="text-xs text-teal-600 dark:text-teal-400 font-medium hover:underline">{t('landing.dashboard.table.viewAll')}</button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs">
                                            <thead>
                                                <tr className="bg-slate-50/60 dark:bg-slate-900/40">
                                                    {[t('landing.dashboard.table.unit'), t('landing.dashboard.table.tds'), t('landing.dashboard.table.pressure'), t('landing.dashboard.table.ph'), t('landing.dashboard.table.status')].map((h) => (
                                                        <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                                                            {h}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                                {[
                                                    { unit: 'RO-001', tds: '127 ppm', pres: '6.2 bar', ph: '7.4', ok: true },
                                                    { unit: 'RO-002', tds: '134 ppm', pres: '6.0 bar', ph: '7.2', ok: true },
                                                    { unit: 'RO-003', tds: '289 ppm', pres: '5.4 bar', ph: '8.1', ok: false },
                                                ].map(({ unit, tds, pres, ph, ok }) => (
                                                    <tr key={unit} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                                        <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{unit}</td>
                                                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{tds}</td>
                                                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{pres}</td>
                                                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{ph}</td>
                                                        <td className="px-4 py-3">
                                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${ok ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400'}`}>
                                                                <Circle className={`w-1.5 h-1.5 fill-current`} />
                                                                {ok ? t('landing.dashboard.table.ok') : t('landing.dashboard.table.alert')}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

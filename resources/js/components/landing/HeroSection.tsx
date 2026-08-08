import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import {
    ArrowRight,
    Play,
    Droplets,
    Gauge,
    Activity,
    Zap,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Wifi,
} from 'lucide-react';
import { Link } from '@inertiajs/react';

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ from, to, suffix = '' }: { from: number; to: number; suffix?: string }) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (v) => Math.round(v).toLocaleString() + suffix);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const controls = animate(count, to, { duration: 2.5, ease: 'easeOut' });
        return controls.stop;
    }, []);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({
    icon: Icon,
    color,
    labelKey,
    value,
    trend,
    delay = 0,
}: {
    icon: React.ElementType;
    color: string;
    labelKey: string;
    value: string;
    trend?: string;
    delay?: number;
}) {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/60 dark:border-slate-700/50 shadow-xl p-4 min-w-[160px]"
        >
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${color} mb-3`}>
                <Icon className="w-4.5 h-4.5 text-white" strokeWidth={2} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">{t(labelKey)}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            {trend && (
                <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {trend}
                </p>
            )}
            <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10 ${color}`} />
        </motion.div>
    );
}

// ─── Mini Chart ───────────────────────────────────────────────────────────────
function MiniChart({ values, color }: { values: number[]; color: string }) {
    const max = Math.max(...values);
    return (
        <div className="flex items-end gap-0.5 h-8">
            {values.map((v, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(v / max) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                    className={`w-2 rounded-t-sm ${color}`}
                />
            ))}
        </div>
    );
}

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────
function DashboardMockup() {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-2xl mx-auto"
        >
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-400/10 rounded-3xl blur-3xl scale-105" />

            {/* Main panel */}
            <div className="relative rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-slate-700/50 shadow-2xl overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <div className="flex-1 mx-4 h-5 rounded-md bg-slate-200/60 dark:bg-slate-700/60 flex items-center px-2">
                        <span className="text-[10px] text-slate-400">app.rosystem.io/dashboard</span>
                    </div>
                    <Wifi className="w-3.5 h-3.5 text-teal-500" />
                </div>

                {/* Dashboard content */}
                <div className="p-5 space-y-4">
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('landing.hero.mock.title')}</div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">{t('landing.hero.mock.subtitle')}</div>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{t('landing.hero.mock.live')}</span>
                        </div>
                    </div>

                    {/* KPI row */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: t('landing.hero.mock.tds'), value: '127 ppm', ok: true },
                            { label: t('landing.hero.mock.pressure'), value: '6.2 bar', ok: true },
                            { label: t('landing.hero.mock.ph'), value: '7.4 pH', ok: true },
                        ].map(({ label, value, ok }) => (
                            <div
                                key={label}
                                className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 p-3"
                            >
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-1 font-medium">{label}</div>
                                <div className="text-sm font-bold text-slate-900 dark:text-white">{value}</div>
                                <MiniChart
                                    values={[60, 75, 65, 80, 72, 85, 70]}
                                    color={ok ? 'bg-teal-400' : 'bg-red-400'}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Alert + Status row */}
                    <div className="flex gap-3">
                        <div className="flex-1 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 p-3 flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <div className="text-xs font-semibold text-amber-700 dark:text-amber-400">{t('landing.hero.mock.alert')}</div>
                                <div className="text-[10px] text-amber-600/70 dark:text-amber-500/70 mt-0.5">{t('landing.hero.mock.alertDetail')}</div>
                            </div>
                        </div>
                        <div className="flex-1 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/50 p-3 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                            <div>
                                <div className="text-xs font-semibold text-teal-700 dark:text-teal-400">{t('landing.hero.mock.units')}</div>
                                <div className="text-[10px] text-teal-600/70 dark:text-teal-500/70 mt-0.5">{t('landing.hero.mock.unitsDetail')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating KPI cards */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-8 top-1/3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-3.5 w-36"
            >
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center">
                        <Activity className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{t('landing.hero.mock.conductivity')}</span>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">482 µS</p>
                <div className="mt-2 h-1 rounded-full bg-slate-100 dark:bg-slate-700">
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600"
                    />
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-8 bottom-1/4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-3.5 w-36"
            >
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Gauge className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{t('landing.hero.mock.recovery')}</span>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">78%</p>
                <div className="flex gap-0.5 items-end h-6 mt-2">
                    {[40, 55, 45, 65, 70, 60, 78].map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${v}%` }}
                            transition={{ duration: 0.6, delay: 0.3 + i * 0.05 }}
                            className="flex-1 rounded-t-sm bg-purple-400"
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function HeroSection() {
    const { t } = useTranslation();

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 pt-16">
            {/* Gradient blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-300/20 dark:bg-teal-600/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-300/20 dark:bg-cyan-600/10 rounded-full blur-3xl animate-pulse [animation-delay:1.5s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-100/10 dark:bg-teal-900/10 rounded-full blur-3xl" />

            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage:
                        'linear-gradient(#0f766e 1px, transparent 1px), linear-gradient(90deg, #0f766e 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Copy */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-primary/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-medium mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                            {t('landing.hero.badge')}
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
                        >
                            {t('landing.hero.titlePart1')}{' '}
                            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                {t('landing.hero.titlePart2')}
                            </span>{' '}
                            {t('landing.hero.titlePart3')}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
                        >
                            {t('landing.hero.subtitle')}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link
                                href="/register"
                                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-primary to-primary hover:primary hover:to-primary rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                {t('landing.hero.ctaPrimary')}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <button className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95">
                                <span className="w-7 h-7 rounded-full bg-teal-500/10 flex items-center justify-center">
                                    <Play className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
                                </span>
                                {t('landing.hero.ctaSecondary')}
                            </button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start"
                        >
                            {[
                                { valueFrom: 0, valueTo: 500, suffix: '+', labelKey: 'landing.hero.stat1' },
                                { valueFrom: 0, valueTo: 99, suffix: '.9%', labelKey: 'landing.hero.stat2' },
                                { valueFrom: 0, valueTo: 50, suffix: 'K+', labelKey: 'landing.hero.stat3' },
                            ].map(({ valueFrom, valueTo, suffix, labelKey }) => (
                                <div key={labelKey} className="text-center">
                                    <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                        <Counter from={valueFrom} to={valueTo} suffix={suffix} />
                                    </div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{t(labelKey)}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Dashboard Mockup */}
                    <div className="relative lg:pl-8">
                        <DashboardMockup />
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
        </section>
    );
}

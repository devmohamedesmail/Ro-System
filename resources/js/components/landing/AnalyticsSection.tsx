import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { TrendingUp, Droplets, Activity, ShieldCheck, Zap } from 'lucide-react';

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
    to,
    suffix = '',
    prefix = '',
    duration = 2.2,
}: {
    to: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) =>
        prefix + (Number.isInteger(to) ? Math.round(v).toLocaleString() : v.toFixed(1)) + suffix,
    );
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            const controls = animate(count, to, { duration, ease: 'easeOut' });
            return controls.stop;
        }
    }, [inView]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

// ─── Bar Chart Visual ─────────────────────────────────────────────────────────
function BarChart({ bars }: { bars: { value: number; label: string; color: string }[] }) {
    const max = Math.max(...bars.map((b) => b.value));
    return (
        <div className="flex items-end gap-2 h-24 mt-4">
            {bars.map(({ value, label, color }, i) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(value / max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                        className={`w-full rounded-t-lg ${color} min-h-[4px]`}
                    />
                    <span className="text-[9px] text-slate-400 font-medium">{label}</span>
                </div>
            ))}
        </div>
    );
}

const stats = [
    {
        icon: Droplets,
        color: 'from-teal-500 to-teal-600',
        ring: 'ring-teal-500/20',
        valueKey: 500,
        suffix: '+',
        labelKey: 'landing.analytics.stat1.label',
        subKey: 'landing.analytics.stat1.sub',
    },
    {
        icon: Activity,
        color: 'from-blue-500 to-blue-600',
        ring: 'ring-blue-500/20',
        valueKey: 99.9,
        suffix: '%',
        labelKey: 'landing.analytics.stat2.label',
        subKey: 'landing.analytics.stat2.sub',
    },
    {
        icon: TrendingUp,
        color: 'from-violet-500 to-violet-600',
        ring: 'ring-violet-500/20',
        valueKey: 40,
        suffix: '%',
        labelKey: 'landing.analytics.stat3.label',
        subKey: 'landing.analytics.stat3.sub',
    },
    {
        icon: ShieldCheck,
        color: 'from-emerald-500 to-emerald-600',
        ring: 'ring-emerald-500/20',
        valueKey: 100,
        suffix: '%',
        labelKey: 'landing.analytics.stat4.label',
        subKey: 'landing.analytics.stat4.sub',
    },
    {
        icon: Zap,
        color: 'from-amber-500 to-amber-600',
        ring: 'ring-amber-500/20',
        valueKey: 3,
        suffix: 'x',
        labelKey: 'landing.analytics.stat5.label',
        subKey: 'landing.analytics.stat5.sub',
    },
];

export default function AnalyticsSection() {
    const { t } = useTranslation();

    return (
        <section id="analytics" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-medium mb-5"
                    >
                        {t('landing.analytics.badge')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5"
                    >
                        {t('landing.analytics.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 dark:text-slate-400"
                    >
                        {t('landing.analytics.subtitle')}
                    </motion.p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
                    {stats.map(({ icon: Icon, color, ring, valueKey, suffix, labelKey, subKey }, i) => (
                        <motion.div
                            key={labelKey}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                            whileHover={{ y: -4, scale: 1.03 }}
                            className={`relative flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg ring-4 ${ring} ring-transparent hover:ring-4 transition-all duration-300`}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mb-4`}>
                                <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                            </div>
                            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                <AnimatedCounter to={valueKey} suffix={suffix} />
                            </p>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">{t(labelKey)}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t(subKey)}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Chart row */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* TDS Trend */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm p-6"
                    >
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{t('landing.analytics.chart1.title')}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t('landing.analytics.chart1.sub')}</p>
                        <BarChart
                            bars={[
                                { value: 130, label: 'Mon', color: 'bg-teal-400' },
                                { value: 125, label: 'Tue', color: 'bg-teal-500' },
                                { value: 140, label: 'Wed', color: 'bg-teal-400' },
                                { value: 127, label: 'Thu', color: 'bg-teal-600' },
                                { value: 135, label: 'Fri', color: 'bg-teal-400' },
                                { value: 122, label: 'Sat', color: 'bg-teal-500' },
                                { value: 129, label: 'Sun', color: 'bg-teal-400' },
                            ]}
                        />
                        <div className="mt-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t('landing.analytics.chart1.trend')}</span>
                        </div>
                    </motion.div>

                    {/* Pressure Trend */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm p-6"
                    >
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{t('landing.analytics.chart2.title')}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t('landing.analytics.chart2.sub')}</p>
                        <BarChart
                            bars={[
                                { value: 6.1, label: 'Mon', color: 'bg-blue-400' },
                                { value: 6.4, label: 'Tue', color: 'bg-blue-500' },
                                { value: 5.9, label: 'Wed', color: 'bg-blue-400' },
                                { value: 6.2, label: 'Thu', color: 'bg-blue-600' },
                                { value: 6.5, label: 'Fri', color: 'bg-blue-400' },
                                { value: 6.0, label: 'Sat', color: 'bg-blue-500' },
                                { value: 6.3, label: 'Sun', color: 'bg-blue-400' },
                            ]}
                        />
                        <div className="mt-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t('landing.analytics.chart2.trend')}</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

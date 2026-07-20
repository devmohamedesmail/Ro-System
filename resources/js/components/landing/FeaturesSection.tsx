import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Droplets,
    MapPin,
    Users,
    ClipboardList,
    Wrench,
    FileBarChart,
    Bell,
    BarChart3,
    FlaskConical,
    Building2,
    ShieldCheck,
} from 'lucide-react';

const features = [
    {
        icon: LayoutDashboard,
        labelKey: 'landing.features.dashboard.title',
        descKey: 'landing.features.dashboard.desc',
        color: 'from-teal-500 to-teal-600',
        bg: 'bg-teal-50 dark:bg-teal-950/40',
        border: 'border-teal-100 dark:border-teal-900/50',
        glow: 'group-hover:shadow-teal-500/20',
    },
    {
        icon: Droplets,
        labelKey: 'landing.features.roUnits.title',
        descKey: 'landing.features.roUnits.desc',
        color: 'from-cyan-500 to-cyan-600',
        bg: 'bg-cyan-50 dark:bg-cyan-950/40',
        border: 'border-cyan-100 dark:border-cyan-900/50',
        glow: 'group-hover:shadow-cyan-500/20',
    },
    {
        icon: MapPin,
        labelKey: 'landing.features.stations.title',
        descKey: 'landing.features.stations.desc',
        color: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50 dark:bg-blue-950/40',
        border: 'border-blue-100 dark:border-blue-900/50',
        glow: 'group-hover:shadow-blue-500/20',
    },
    {
        icon: Users,
        labelKey: 'landing.features.operators.title',
        descKey: 'landing.features.operators.desc',
        color: 'from-violet-500 to-violet-600',
        bg: 'bg-violet-50 dark:bg-violet-950/40',
        border: 'border-violet-100 dark:border-violet-900/50',
        glow: 'group-hover:shadow-violet-500/20',
    },
    {
        icon: ClipboardList,
        labelKey: 'landing.features.readings.title',
        descKey: 'landing.features.readings.desc',
        color: 'from-indigo-500 to-indigo-600',
        bg: 'bg-indigo-50 dark:bg-indigo-950/40',
        border: 'border-indigo-100 dark:border-indigo-900/50',
        glow: 'group-hover:shadow-indigo-500/20',
    },
    {
        icon: Wrench,
        labelKey: 'landing.features.maintenance.title',
        descKey: 'landing.features.maintenance.desc',
        color: 'from-amber-500 to-amber-600',
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        border: 'border-amber-100 dark:border-amber-900/50',
        glow: 'group-hover:shadow-amber-500/20',
    },
    {
        icon: FileBarChart,
        labelKey: 'landing.features.reports.title',
        descKey: 'landing.features.reports.desc',
        color: 'from-rose-500 to-rose-600',
        bg: 'bg-rose-50 dark:bg-rose-950/40',
        border: 'border-rose-100 dark:border-rose-900/50',
        glow: 'group-hover:shadow-rose-500/20',
    },
    {
        icon: Bell,
        labelKey: 'landing.features.notifications.title',
        descKey: 'landing.features.notifications.desc',
        color: 'from-orange-500 to-orange-600',
        bg: 'bg-orange-50 dark:bg-orange-950/40',
        border: 'border-orange-100 dark:border-orange-900/50',
        glow: 'group-hover:shadow-orange-500/20',
    },
    {
        icon: BarChart3,
        labelKey: 'landing.features.analytics.title',
        descKey: 'landing.features.analytics.desc',
        color: 'from-teal-500 to-cyan-600',
        bg: 'bg-teal-50 dark:bg-teal-950/40',
        border: 'border-teal-100 dark:border-teal-900/50',
        glow: 'group-hover:shadow-teal-500/20',
    },
    {
        icon: FlaskConical,
        labelKey: 'landing.features.waterQuality.title',
        descKey: 'landing.features.waterQuality.desc',
        color: 'from-sky-500 to-sky-600',
        bg: 'bg-sky-50 dark:bg-sky-950/40',
        border: 'border-sky-100 dark:border-sky-900/50',
        glow: 'group-hover:shadow-sky-500/20',
    },
    {
        icon: Building2,
        labelKey: 'landing.features.multiCompany.title',
        descKey: 'landing.features.multiCompany.desc',
        color: 'from-slate-600 to-slate-700',
        bg: 'bg-slate-50 dark:bg-slate-800/60',
        border: 'border-slate-200 dark:border-slate-700/50',
        glow: 'group-hover:shadow-slate-500/20',
    },
    {
        icon: ShieldCheck,
        labelKey: 'landing.features.roles.title',
        descKey: 'landing.features.roles.desc',
        color: 'from-emerald-500 to-emerald-600',
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        border: 'border-emerald-100 dark:border-emerald-900/50',
        glow: 'group-hover:shadow-emerald-500/20',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function FeaturesSection() {
    const { t } = useTranslation();

    return (
        <section id="features" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-medium mb-5"
                    >
                        {t('landing.features.badge')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5"
                    >
                        {t('landing.features.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed"
                    >
                        {t('landing.features.subtitle')}
                    </motion.p>
                </div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                    {features.map(({ icon: Icon, labelKey, descKey, color, bg, border, glow }) => (
                        <motion.div
                            key={labelKey}
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className={`group relative overflow-hidden rounded-2xl ${bg} ${border} border p-6 cursor-default hover:shadow-xl ${glow} hover:shadow-xl transition-all duration-300`}
                        >
                            {/* Icon */}
                            <div
                                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${color} shadow-lg mb-4`}
                            >
                                <Icon className="w-5.5 h-5.5 text-white" strokeWidth={2} />
                            </div>

                            {/* Text */}
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{t(labelKey)}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t(descKey)}</p>

                            {/* Decorative corner glow */}
                            <div
                                className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const traditionalItems = [
    'landing.benefits.traditional.item1',
    'landing.benefits.traditional.item2',
    'landing.benefits.traditional.item3',
    'landing.benefits.traditional.item4',
    'landing.benefits.traditional.item5',
    'landing.benefits.traditional.item6',
];

const modernItems = [
    'landing.benefits.modern.item1',
    'landing.benefits.modern.item2',
    'landing.benefits.modern.item3',
    'landing.benefits.modern.item4',
    'landing.benefits.modern.item5',
    'landing.benefits.modern.item6',
];

export default function BenefitsSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-medium mb-5"
                    >
                        {t('landing.benefits.badge')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5"
                    >
                        {t('landing.benefits.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 dark:text-slate-400"
                    >
                        {t('landing.benefits.subtitle')}
                    </motion.p>
                </div>

                {/* Comparison Cards */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
                    {/* Traditional */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="relative rounded-3xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-sm"
                    >
                        {/* Label */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-6">
                            <X className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('landing.benefits.traditional.label')}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            {t('landing.benefits.traditional.title')}
                        </h3>

                        <ul className="space-y-3">
                            {traditionalItems.map((key) => (
                                <li key={key} className="flex items-start gap-3">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0">
                                        <X className="w-3 h-3 text-red-400" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{t(key)}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Decorative */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full bg-slate-100/50 dark:bg-slate-800/20 -z-0 rounded-br-3xl" />
                    </motion.div>

                    {/* Modern RO System */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="relative rounded-3xl border-2 border-teal-300 dark:border-teal-700/80 bg-gradient-to-br from-teal-50 to-cyan-50/50 dark:from-teal-950/40 dark:to-cyan-950/20 p-8 shadow-xl shadow-teal-500/10"
                    >
                        {/* Recommended label */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500 text-white mb-6">
                            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                            <span className="text-xs font-bold">{t('landing.benefits.modern.label')}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            {t('landing.benefits.modern.title')}
                        </h3>

                        <ul className="space-y-3">
                            {modernItems.map((key) => (
                                <li key={key} className="flex items-start gap-3">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-teal-600 dark:text-teal-400" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t(key)}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Glow decoration */}
                        <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-teal-400/10 rounded-full blur-2xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

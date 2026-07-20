import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        nameKey: 'landing.testimonials.t1.name',
        roleKey: 'landing.testimonials.t1.role',
        companyKey: 'landing.testimonials.t1.company',
        quoteKey: 'landing.testimonials.t1.quote',
        avatar: 'AH',
        color: 'from-teal-500 to-teal-700',
    },
    {
        nameKey: 'landing.testimonials.t2.name',
        roleKey: 'landing.testimonials.t2.role',
        companyKey: 'landing.testimonials.t2.company',
        quoteKey: 'landing.testimonials.t2.quote',
        avatar: 'MB',
        color: 'from-blue-500 to-blue-700',
    },
    {
        nameKey: 'landing.testimonials.t3.name',
        roleKey: 'landing.testimonials.t3.role',
        companyKey: 'landing.testimonials.t3.company',
        quoteKey: 'landing.testimonials.t3.quote',
        avatar: 'SR',
        color: 'from-violet-500 to-violet-700',
    },
];

export default function TestimonialsSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 lg:py-32 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-medium mb-5"
                    >
                        {t('landing.testimonials.badge')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5"
                    >
                        {t('landing.testimonials.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 dark:text-slate-400"
                    >
                        {t('landing.testimonials.subtitle')}
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map(({ nameKey, roleKey, companyKey, quoteKey, avatar, color }, i) => (
                        <motion.div
                            key={nameKey}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                            whileHover={{ y: -6 }}
                            className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/70 dark:border-slate-700/50 shadow-xl hover:shadow-2xl p-8 flex flex-col gap-5 transition-all duration-300 group"
                        >
                            {/* Glassmorphism glow */}
                            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

                            {/* Quote icon */}
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                                <Quote className="w-5 h-5 text-white" strokeWidth={2} />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                ))}
                            </div>

                            {/* Quote text */}
                            <blockquote className="flex-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                "{t(quoteKey)}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div
                                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold shadow-md`}
                                >
                                    {avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t(nameKey)}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {t(roleKey)} · {t(companyKey)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

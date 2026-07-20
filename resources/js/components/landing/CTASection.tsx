import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Droplets } from 'lucide-react';

export default function CTASection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 lg:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-700 dark:from-teal-800 dark:via-teal-900 dark:to-cyan-900" />

            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl" />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mb-8 mx-auto"
                >
                    <Droplets className="w-8 h-8 text-white" strokeWidth={2} />
                </motion.div>

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
                >
                    {t('landing.cta.title')}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-lg sm:text-xl text-teal-100 dark:text-teal-200 leading-relaxed max-w-2xl mx-auto mb-12"
                >
                    {t('landing.cta.subtitle')}
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="/register"
                        className="group inline-flex items-center gap-2.5 px-8 py-4 text-base font-bold text-teal-700 bg-white hover:bg-teal-50 rounded-2xl shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        {t('landing.cta.primary')}
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-bold text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        {t('landing.cta.secondary')}
                    </a>
                </motion.div>

                {/* Trust row */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center justify-center gap-6 mt-10 flex-wrap"
                >
                    {[
                        'landing.cta.trust1',
                        'landing.cta.trust2',
                        'landing.cta.trust3',
                    ].map((key) => (
                        <div key={key} className="flex items-center gap-2 text-teal-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-300" />
                            <span className="text-sm font-medium">{t(key)}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

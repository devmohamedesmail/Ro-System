import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Zap, Building2, Rocket } from 'lucide-react';

type Plan = {
    icon: React.ElementType;
    tierKey: string;
    priceKey: string;
    periodKey: string;
    descKey: string;
    features: string[];
    ctaKey: string;
    highlighted: boolean;
    color: string;
    gradient: string;
    shadow: string;
};

const plans: Plan[] = [
    {
        icon: Zap,
        tierKey: 'landing.pricing.starter.tier',
        priceKey: 'landing.pricing.starter.price',
        periodKey: 'landing.pricing.starter.period',
        descKey: 'landing.pricing.starter.desc',
        features: [
            'landing.pricing.starter.f1',
            'landing.pricing.starter.f2',
            'landing.pricing.starter.f3',
            'landing.pricing.starter.f4',
            'landing.pricing.starter.f5',
        ],
        ctaKey: 'landing.pricing.starter.cta',
        highlighted: false,
        color: 'text-teal-600 dark:text-teal-400',
        gradient: 'from-teal-500 to-teal-600',
        shadow: 'shadow-teal-500/20',
    },
    {
        icon: Rocket,
        tierKey: 'landing.pricing.pro.tier',
        priceKey: 'landing.pricing.pro.price',
        periodKey: 'landing.pricing.pro.period',
        descKey: 'landing.pricing.pro.desc',
        features: [
            'landing.pricing.pro.f1',
            'landing.pricing.pro.f2',
            'landing.pricing.pro.f3',
            'landing.pricing.pro.f4',
            'landing.pricing.pro.f5',
            'landing.pricing.pro.f6',
        ],
        ctaKey: 'landing.pricing.pro.cta',
        highlighted: true,
        color: 'text-white',
        gradient: 'from-teal-500 to-cyan-500',
        shadow: 'shadow-teal-500/40',
    },
    {
        icon: Building2,
        tierKey: 'landing.pricing.enterprise.tier',
        priceKey: 'landing.pricing.enterprise.price',
        periodKey: 'landing.pricing.enterprise.period',
        descKey: 'landing.pricing.enterprise.desc',
        features: [
            'landing.pricing.enterprise.f1',
            'landing.pricing.enterprise.f2',
            'landing.pricing.enterprise.f3',
            'landing.pricing.enterprise.f4',
            'landing.pricing.enterprise.f5',
            'landing.pricing.enterprise.f6',
        ],
        ctaKey: 'landing.pricing.enterprise.cta',
        highlighted: false,
        color: 'text-slate-600 dark:text-slate-400',
        gradient: 'from-slate-600 to-slate-700',
        shadow: 'shadow-slate-500/20',
    },
];

export default function PricingSection() {
    const { t } = useTranslation();

    return (
        <section id="pricing" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-medium mb-5"
                    >
                        {t('landing.pricing.badge')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5"
                    >
                        {t('landing.pricing.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 dark:text-slate-400"
                    >
                        {t('landing.pricing.subtitle')}
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {plans.map(
                        (
                            { icon: Icon, tierKey, priceKey, periodKey, descKey, features, ctaKey, highlighted, color, gradient, shadow },
                            i,
                        ) => (
                            <motion.div
                                key={tierKey}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                                className={`relative overflow-hidden rounded-3xl border-2 p-8 flex flex-col gap-6 transition-all duration-300 hover:scale-[1.02] ${
                                    highlighted
                                        ? 'bg-gradient-to-br from-teal-600 to-teal-700 border-teal-500 shadow-2xl shadow-teal-500/30 -mt-4 scale-[1.02]'
                                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg'
                                }`}
                            >
                                {/* Popular badge */}
                                {highlighted && (
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
                                        {t('landing.pricing.popular')}
                                    </div>
                                )}

                                {/* Icon + Tier */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${highlighted ? 'bg-white/20' : `bg-gradient-to-br ${gradient} shadow-${shadow}`}`}
                                    >
                                        <Icon
                                            className={`w-5.5 h-5.5 ${highlighted ? 'text-white' : 'text-white'}`}
                                            strokeWidth={2}
                                        />
                                    </div>
                                    <span
                                        className={`text-sm font-bold uppercase tracking-wider ${highlighted ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'}`}
                                    >
                                        {t(tierKey)}
                                    </span>
                                </div>

                                {/* Price */}
                                <div>
                                    <div className="flex items-end gap-1.5">
                                        <span className={`text-5xl font-extrabold ${highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                            {t(priceKey)}
                                        </span>
                                        <span className={`text-sm font-medium mb-2 ${highlighted ? 'text-teal-100' : 'text-slate-400 dark:text-slate-500'}`}>
                                            {t(periodKey)}
                                        </span>
                                    </div>
                                    <p className={`text-sm mt-2 ${highlighted ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                        {t(descKey)}
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className={`h-px ${highlighted ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`} />

                                {/* Features */}
                                <ul className="flex-1 space-y-3">
                                    {features.map((fKey) => (
                                        <li key={fKey} className="flex items-start gap-3">
                                            <div
                                                className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                                    highlighted ? 'bg-white/20' : 'bg-teal-50 dark:bg-teal-950/30'
                                                }`}
                                            >
                                                <Check className={`w-3 h-3 ${highlighted ? 'text-white' : 'text-teal-600 dark:text-teal-400'}`} strokeWidth={2.5} />
                                            </div>
                                            <span className={`text-sm ${highlighted ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'}`}>
                                                {t(fKey)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <a
                                    href="/register"
                                    className={`w-full flex items-center justify-center px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                                        highlighted
                                            ? 'bg-white text-teal-700 hover:bg-teal-50 shadow-lg'
                                            : 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40'
                                    }`}
                                >
                                    {t(ctaKey)}
                                </a>

                                {/* Decoration */}
                                {highlighted && (
                                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5 blur-xl" />
                                )}
                            </motion.div>
                        ),
                    )}
                </div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-sm text-slate-400 dark:text-slate-500 mt-10"
                >
                    {t('landing.pricing.note')}
                </motion.p>
            </div>
        </section>
    );
}

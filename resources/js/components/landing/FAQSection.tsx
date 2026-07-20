import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    { qKey: 'landing.faq.q1', aKey: 'landing.faq.a1' },
    { qKey: 'landing.faq.q2', aKey: 'landing.faq.a2' },
    { qKey: 'landing.faq.q3', aKey: 'landing.faq.a3' },
    { qKey: 'landing.faq.q4', aKey: 'landing.faq.a4' },
    { qKey: 'landing.faq.q5', aKey: 'landing.faq.a5' },
    { qKey: 'landing.faq.q6', aKey: 'landing.faq.a6' },
];

function FAQItem({ qKey, aKey, isOpen, onToggle }: { qKey: string; aKey: string; isOpen: boolean; onToggle: () => void }) {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-2xl border transition-all duration-300 ${
                isOpen
                    ? 'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/60 hover:border-teal-200 dark:hover:border-teal-800'
            }`}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
            >
                <span className={`text-sm font-semibold ${isOpen ? 'text-teal-700 dark:text-teal-300' : 'text-slate-800 dark:text-slate-200'}`}>
                    {t(qKey)}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isOpen ? 'bg-teal-500' : 'bg-slate-100 dark:bg-slate-800'}`}
                >
                    <ChevronDown className={`w-3.5 h-3.5 ${isOpen ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} strokeWidth={2.5} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {t(aKey)}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQSection() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 lg:py-32 bg-white dark:bg-slate-950">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-14">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-medium mb-5"
                    >
                        {t('landing.faq.badge')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5"
                    >
                        {t('landing.faq.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 dark:text-slate-400"
                    >
                        {t('landing.faq.subtitle')}
                    </motion.p>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map(({ qKey, aKey }, i) => (
                        <FAQItem
                            key={qKey}
                            qKey={qKey}
                            aKey={aKey}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

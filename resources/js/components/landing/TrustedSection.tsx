import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';

const companies = [
    'landing.trusted.company1',
    'landing.trusted.company2',
    'landing.trusted.company3',
    'landing.trusted.company4',
    'landing.trusted.company5',
    'landing.trusted.company6',
];

const LogoPlaceholder = ({ nameKey, delay }: { nameKey: string; delay: number }) => {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-md hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300 group cursor-default"
        >
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Droplets className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300 whitespace-nowrap">
                {t(nameKey)}
            </span>
        </motion.div>
    );
};

export default function TrustedSection() {
    const { t } = useTranslation();

    return (
        <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-10"
                >
                    {t('landing.trusted.label')}
                </motion.p>

                <div className="relative overflow-hidden">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />

                    {/* Marquee */}
                    <motion.div
                        animate={{ x: [0, -50 + '%'] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="flex gap-4 w-max"
                    >
                        {[...companies, ...companies].map((key, i) => (
                            <LogoPlaceholder key={`${key}-${i}`} nameKey={key} delay={i * 0.05} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { UserPlus, Cpu, BarChart3, Bell } from 'lucide-react';

const steps = [
    { icon: UserPlus, color: 'from-teal-500 to-teal-600', bgLight: 'bg-teal-50 dark:bg-teal-950/40', border: 'border-teal-200 dark:border-teal-800', num: '01' },
    { icon: Cpu, color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50 dark:bg-blue-950/40', border: 'border-blue-200 dark:border-blue-800', num: '02' },
    { icon: BarChart3, color: 'from-violet-500 to-violet-600', bgLight: 'bg-violet-50 dark:bg-violet-950/40', border: 'border-violet-200 dark:border-violet-800', num: '03' },
    { icon: Bell, color: 'from-amber-500 to-amber-600', bgLight: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-200 dark:border-amber-800', num: '04' },
];

export default function WorkflowSection() {
    const { t } = useTranslation();

    return (
        <section id="workflow" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/40 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-medium mb-5"
                    >
                        {t('landing.workflow.badge')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5"
                    >
                        {t('landing.workflow.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 dark:text-slate-400"
                    >
                        {t('landing.workflow.subtitle')}
                    </motion.p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connector line (desktop) */}
                    <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-teal-200 via-blue-200 to-amber-200 dark:from-teal-800 dark:via-blue-800 dark:to-amber-800" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map(({ icon: Icon, color, bgLight, border, num }, index) => (
                            <motion.div
                                key={num}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                                className="flex flex-col items-center text-center relative"
                            >
                                {/* Step number bubble */}
                                <div className="relative mb-6 z-10">
                                    <div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-xl shadow-${color.split('-')[1]}-500/30`}
                                    >
                                        <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                        <span className="text-[9px] font-extrabold text-slate-500 dark:text-slate-400">{num}</span>
                                    </div>
                                </div>

                                {/* Card */}
                                <div className={`w-full rounded-2xl ${bgLight} ${border} border p-6 hover:shadow-lg transition-shadow duration-300`}>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                                        {t(`landing.workflow.step${index + 1}.title`)}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                        {t(`landing.workflow.step${index + 1}.desc`)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

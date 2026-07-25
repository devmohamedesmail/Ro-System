import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import useSetting from '@/hooks/use-setting';
import { Droplets } from 'lucide-react';
import useImport from '@/hooks/use-import';
export default function Logo() {
    const { settings } = useSetting()
    const { t } = useImport();
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 shrink-0"
        >
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <Droplets className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                <img src={settings.app_logo || ''} alt={settings.app_name_ar} />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                {t('landing.brand')}
            </span>
        </motion.div>
    )
}

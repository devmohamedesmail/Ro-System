import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import useSetting from '@/hooks/use-setting';

export default function Logo() {
    const { settings } = useSetting()

   
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 shrink-0"
        >
            <div className="relative w-12 h-12 rounded-xl  flex items-center justify-center shadow-lg ">
                <img src={settings.app_logo || ''} alt={settings.app_name_ar} />
            </div>
            {/* <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                {settings.app_name_ar}
            </span> */}
        </motion.div>
    )
}

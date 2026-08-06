import React from 'react'
import { Droplets } from 'lucide-react'
import useImport from '@/hooks/use-import';
import useComapny from '@/hooks/use-comapny';
export default function ReadingHeader() {
    const { t } = useImport();
    const { company } = useComapny();
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 shadow-lg shadow-cyan-200 dark:shadow-cyan-900/40">
                    <Droplets className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t('ro-units.readings')}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {company?.name} &mdash; {t('ro-units.readings-subtitle')}
                    </p>
                </div>
            </div>
        </div>
    )
}

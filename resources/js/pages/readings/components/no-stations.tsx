import React from 'react'
import { Droplets } from 'lucide-react'
import useImport from '@/hooks/use-import'
export default function NoStations() {
    const {t}=useImport()
  return (
     <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <Droplets className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('stations.no_stations', 'No Stations Available')}</h3>
            <p className="text-gray-500 dark:text-gray-400">{t('stations.no_stations_desc', 'Please add a station and RO units to start recording readings.')}</p>
          </div>
  )
}

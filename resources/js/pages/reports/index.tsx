import { DashboardLayout } from '../dashboard/components/DashboardLayout'
import { FileBarChart2, Droplets } from 'lucide-react'
import useImport from '@/hooks/use-import'
import useComapny from '@/hooks/use-comapny'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DailyReportForm } from './components/DailyReportForm'

export default function DailyReports({ stations }: { stations: Array<any> }) {
    const { t } = useImport()
    const { company } = useComapny()
    const defaultStation = stations?.[0]?.id?.toString() || ''
    return (
        <DashboardLayout>
            <div className="container mx-auto p-4 sm:p-6 lg:p-10 max-w-7xl">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 shadow-lg shadow-teal-200 dark:shadow-teal-900/40">
                            <FileBarChart2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {t('reports.title', 'Daily Reports / التقارير اليومية')}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {company?.name} &mdash;{' '}
                                {t('reports.subtitle', 'Submit daily operational readings and observations')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stations Tabs */}
                {stations && stations.length > 0 ? (
                    <Tabs defaultValue={defaultStation} className="w-full">
                        <TabsList className="flex py-3 w-full justify-start overflow-x-auto bg-transparent h-auto mb-6 p-1 border-b border-gray-200 dark:border-gray-800 rounded-none hide-scrollbar">
                            {stations.map((station: any) => (
                                <TabsTrigger
                                    key={station.id}
                                    value={station.id.toString()}
                                    className="h-10 px-6 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900/30 dark:data-[state=active]:text-teal-300 rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:shadow-none transition-colors"
                                >
                                    {station.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {stations.map((station: any) => (
                            <TabsContent
                                key={station.id}
                                value={station.id.toString()}
                                className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-0 focus-visible:outline-none focus-visible:ring-0"
                            >
                                {station.ro_units && station.ro_units.length > 0 ? (
                                    station.ro_units.map((unit: any) => (
                                        <DailyReportForm key={unit.id} unit={unit} t={t} />
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                                        <Droplets className="mx-auto h-10 w-10 text-gray-300 dark:text-gray-600 mb-3" />
                                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                                            {t('ro-units.no_units_found', 'No RO units found for this station.')}
                                        </p>
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <FileBarChart2 className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {t('stations.no_stations', 'No Stations Available')}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            {t(
                                'stations.no_stations_desc',
                                'Please add a station and RO units to start recording daily reports.',
                            )}
                        </p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

import { DashboardLayout } from '../dashboard/components/DashboardLayout'
import useImport from '@/hooks/use-import'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RoUnitReadingForm } from './components/RoUnitReadingForm'
import NoStations from './components/no-stations'
import ReadingHeader from './components/reading-header'

export default function RoReadings({ stations }: any) {
  const { t } = useImport();
  const defaultStation = stations?.[0]?.id?.toString() || '';

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 sm:p-6 lg:p-10">
        <ReadingHeader />

        {stations && stations.length > 0 ? (
          <Tabs defaultValue={defaultStation} className="w-full">
            <TabsList className='flex py-3 w-full justify-start overflow-x-auto bg-transparent h-auto mb-6 p-1 border-b border-gray-200 dark:border-gray-800 rounded-none hide-scrollbar'>
              {stations.map((station: any) => (
                <TabsTrigger 
                  key={station.id} 
                  value={station.id.toString()}
                  className="h-10 px-6 data-[state=active]:bg-cyan-50 data-[state=active]:text-cyan-700 dark:data-[state=active]:bg-cyan-900/30 dark:data-[state=active]:text-cyan-300 rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-cyan-600 data-[state=active]:shadow-none transition-colors"
                >
                  {station.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {stations.map((station: any) => (
              <TabsContent key={station.id} value={station.id.toString()} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-0 focus-visible:outline-none focus-visible:ring-0">
                {station.ro_units && station.ro_units.length > 0 ? (
                  station.ro_units.map((unit: any) => (
                    <RoUnitReadingForm key={unit.id} unit={unit} t={t} />
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">
                        {t('ro-units.no_units_found')}
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
         <NoStations />
        )}

      </div>
    </DashboardLayout>
  )
}

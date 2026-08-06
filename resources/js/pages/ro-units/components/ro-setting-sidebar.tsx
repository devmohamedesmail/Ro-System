import useImport from '@/hooks/use-import'
import { CheckCircle2, Settings2, Zap } from 'lucide-react'
import { cn } from '@/lib/utils';

export default function RoSettingSidebar({ company, stations, setSelectedUnitId, selectedUnitId }: any) {

    const { t } = useImport()

    return (
        <aside className="w-full shrink-0 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 lg:w-64 lg:border-b-0 lg:border-e">
            {/* Header */}

            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Settings2 className="h-4 w-4 text-white" />
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {t('ro-settings.title')}
                    </p>
                    <p className="text-xs text-gray-400">{company?.name}</p>
                </div>
            </div>

            {/* Unit list */}
            <div className="overflow-y-auto p-2">
                {stations?.map((station: any) => (
                    <div key={station.id}>
                        {/* <h1 className='bg-primary text-center py-2'> {station.name}</h1>
                            */}
                        <div className="mb-2 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                                <Zap className="h-4 w-4 text-white" />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-xs font-semibold uppercase tracking-wide text-primary">
                                   {t("stations.station")} 
                                </p>
                                <h1 className="truncate text-sm font-bold text-gray-900 dark:text-white">
                                    {station.name}
                                </h1>
                            </div>
                        </div>
                        {station.ro_units.map((unit: any) => (
                            <button
                                key={unit.id}
                                type="button"
                                onClick={() => setSelectedUnitId(unit.id)}
                                className={cn(
                                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition',
                                    selectedUnitId === unit.id
                                        ? 'bg-primary text-white dark:bg-bg-primary dark:text-white'
                                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800',
                                )}
                            >
                                <Zap className="h-4 w-4 shrink-0 text-white" />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{unit.name}</p>
                                    <p className="font-mono text-xs text-black">{unit.code}</p>
                                </div>
                                {selectedUnitId === unit.id && (
                                    <CheckCircle2 className="ms-auto h-4 w-4 shrink-0 text-white" />
                                )}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </aside>
    )
}

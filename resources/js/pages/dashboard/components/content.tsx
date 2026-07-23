import React from 'react'

export default function content() {
  return (
     <div className="min-h-full px-4 py-6 sm:px-6 lg:px-8">
                {/* ── Page Header ─────────────────────────────────────────── */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                            Operations Overview
                        </h1>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{now}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 dark:bg-green-900/30">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                            <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                                Live Monitoring
                            </span>
                        </div>
                        <button
                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                            title="Refresh data"
                        >
                            <RefreshCw className="h-3.5 w-3.5" />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* ── KPI Stats Grid ───────────────────────────────────────── */}
                <section aria-label="Key Performance Indicators" className="mb-8">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                        {mockKpiStats.map((stat) => (
                            <StatCard key={stat.id} stat={stat} />
                        ))}
                    </div>
                </section>

                {/* ── RO Unit Monitoring ───────────────────────────────────── */}
                <section aria-label="RO Unit Monitoring" className="mb-8">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Activity className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                                RO Unit Monitoring
                            </h2>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                {mockROUnits.length} units
                            </span>
                        </div>
                        <a
                            href="/ro-units"
                            className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                            View All Units →
                        </a>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {mockROUnits.map((unit) => (
                            <UnitCard key={unit.id} unit={unit} />
                        ))}
                    </div>
                </section>

                {/* ── Charts Grid ──────────────────────────────────────────── */}
                <section aria-label="Performance Charts" className="mb-8">
                    <div className="mb-4 flex items-center gap-2">
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                            Analytics &amp; Trends
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <ProductionChart />
                        <PressureChart />
                        <ConductivityChart />
                        <WaterQualityChart />
                    </div>
                    <div className="mt-5">
                        <DailyPerformanceChart />
                    </div>
                </section>

                {/* ── Alerts + Readings ────────────────────────────────────── */}
                <section aria-label="Alerts and Recent Readings" className="mb-8">
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
                        {/* Alerts panel — 2 cols */}
                        <div className="xl:col-span-2">
                            <AlertsPanel alerts={mockAlerts} />
                        </div>

                        {/* Readings table — 3 cols */}
                        <div className="xl:col-span-3">
                            <ReadingsTable readings={mockReadings} />
                        </div>
                    </div>
                </section>
            </div>
  )
}

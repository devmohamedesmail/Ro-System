import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
  Building2,
  Droplets,
  ArrowRight,
  MapPin,
} from "lucide-react";

import { DashboardLayout } from "./components/DashboardLayout";
import useImport from "@/hooks/use-import";

export default function Dashboard({
  stations,
}: {
  stations: Array<any>;
}) {
  const { t } = useImport()
  return (
    <DashboardLayout>
      <Head title="Dashboard — AquaRO" />

      <div className="space-y-8 container mx-auto px-10 py-10">
        <div className="mb-8 flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {t("reports.badge")}
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t("reports.title")}
          </h1>

          <p className="max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400">
            {t("reports.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stations.map((station) => (
            <div
              key={station.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              {/* Station Header */}
              <div className="border-b border-gray-100 p-6 dark:border-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                      <Building2 size={28} />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {station.name}
                      </h2>

                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={15} />
                        <span>{station.address}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${station.is_active
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                  >
                    {station.is_active
                      ? t("reports.active")
                      : t("reports.inactive")}
                  </span>
                </div>
              </div>

              {/* RO Units */}
              <div className="space-y-4 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {t("reports.roUnits")}
                </h3>

                {station.ro_units.length ? (
                  station.ro_units.map((unit: any) => (
                    <div
                      key={unit.id}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-primary hover:bg-primary/20 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800"
                    >
                      {/* Unit Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-cyan-100 p-3 text-cyan-600 dark:bg-cyan-900/30">
                            <Droplets size={20} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {unit.name}
                            </p>

                            <p className="text-sm text-gray-500">
                              {t("reports.code")}: {unit.code}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow dark:bg-gray-900 dark:text-gray-300">
                          {unit.capacity} L/H
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <Link
                          href={`/ro-units/${unit.id}`}
                          className="rounded-lg border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300"
                        >
                          {t("reports.details")}
                        </Link>

                        <Link
                          href={`/readings/ro-unit/${unit.id}`}
                          className="rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          {t("reports.readings")}
                        </Link>

                        <Link
                          href={`/reports/${unit.id}`}
                          className="rounded-lg bg-emerald-600 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-emerald-700"
                        >
                          {t("reports.dailyReports")}
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700">
                    {t("reports.noRoUnits")}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
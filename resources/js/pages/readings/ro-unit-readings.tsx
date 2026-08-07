import { Head, Link, router } from "@inertiajs/react";
import {
    Droplets,
    ArrowLeft,
    FileText,
} from "lucide-react";

import { DashboardLayout } from "../dashboard/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import useImport from "@/hooks/use-import";
import SessionCard from "./components/session-card";
import DateFilterBar from "./components/date-filter-bar";
import Pagination from "./components/pagination";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Parameter {
    id: number;
    name: string;
    value: string;
    unit: string;
}

interface Category {
    id: number;
    name: string;
    parameters: Parameter[];
}

interface Session {
    id: number;
    ro_unit_id: number;
    reading_at: string;
    categories: Category[];
}

interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

interface Paginated {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    data: Session[];
    links: PaginationLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface RoUnit {
    id: number;
    name: string;
    code: string | null;
}

interface Filters {
    date_from?: string | null;
    date_to?: string | null;
}

interface Props {
    roUnit: RoUnit;
    sessions: Paginated;
    filters: Filters;
}






export default function RoUnitReadings({ roUnit, sessions, filters }: Props) {
    const { t } = useImport();
    const { data, current_page, last_page, total, from, to, links } = sessions;

    return (
        <DashboardLayout>
            <Head title={`${roUnit.name} — ${t("readings.title")}`} />

            <div className="space-y-6 p-6">
                {/* ── Page Header ─────────────────────────────────────── */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30">
                            <Droplets className="h-6 w-6" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {roUnit.name}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {t("readings.title")} &mdash;{" "}
                                <span className="font-medium">{total}</span> {t("readings.sessions")}
                            </p>
                        </div>
                    </div>

                    <Button variant="outline" size="sm" asChild>
                        <Link href="/readings">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t("readings.title")}
                        </Link>
                    </Button>
                </div>

                {/* ── Date Filter ─────────────────────────────────────── */}
                <DateFilterBar roUnitId={roUnit.id} filters={filters} />

                {/* ── Sessions list ───────────────────────────────────── */}
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-20 text-center dark:border-gray-700">
                        <FileText className="mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
                        <p className="font-medium text-gray-900 dark:text-white">
                            {t("readings.noSessions")}
                        </p>
                        {(filters.date_from || filters.date_to) && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try adjusting the date range.
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {data.map((session, i) => (
                            <SessionCard key={session.id} session={session} index={i} />
                        ))}
                    </div>
                )}

                {/* ── Pagination ──────────────────────────────────────── */}
                {data.length > 0 && (
                    <Pagination
                        links={links}
                        currentPage={current_page}
                        lastPage={last_page}
                        total={total}
                        from={from}
                        to={to}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}

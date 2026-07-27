import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    Droplets,
    Clock,
    Tag,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    FileText,
    CalendarDays,
    ChevronDown,
    ChevronUp,
    Filter,
    X,
} from "lucide-react";

import { DashboardLayout } from "../dashboard/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useImport from "@/hooks/use-import";

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

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDateTime(iso: string): string {
    return new Date(iso).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatDateShort(iso: string): string {
    return new Date(iso).toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

/** Take only the English portion before "/" */
function enName(name: string): string {
    return name.split(" / ")[0].trim();
}

// ─── Category badge colors ──────────────────────────────────────────────────────

const CATEGORY_STYLE: Record<
    string,
    { badge: string; header: string; dot: string }
> = {
    Conductivity: {
        badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
        header: "bg-teal-50 border-teal-200 dark:bg-teal-900/10 dark:border-teal-800",
        dot: "bg-teal-500",
    },
    "Water Flow Rate": {
        badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
        header: "bg-cyan-50 border-cyan-200 dark:bg-cyan-900/10 dark:border-cyan-800",
        dot: "bg-cyan-500",
    },
    Pressure: {
        badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        header: "bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800",
        dot: "bg-blue-500",
    },
    "Electrical Reading": {
        badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
        header: "bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800",
        dot: "bg-amber-500",
    },
};

const DEFAULT_STYLE = {
    badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    header: "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700",
    dot: "bg-gray-400",
};

function getCategoryStyle(name: string) {
    const key = Object.keys(CATEGORY_STYLE).find((k) => name.includes(k));
    return key ? CATEGORY_STYLE[key] : DEFAULT_STYLE;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Pagination({
    links,
    currentPage,
    lastPage,
    total,
    from,
    to,
}: {
    links: PaginationLink[];
    currentPage: number;
    lastPage: number;
    total: number;
    from: number;
    to: number;
}) {
    const navigate = (url: string | null) => {
        if (!url) return;
        router.visit(url, { preserveScroll: true });
    };

    const pageLinks = links.filter((l) => l.page !== null);
    if (lastPage <= 1) return null;

    return (
        <div className="flex flex-col items-center gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-between dark:border-gray-800">
            <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-gray-900 dark:text-white">{from}–{to}</span> of{" "}
                <span className="font-medium text-gray-900 dark:text-white">{total}</span> sessions
            </p>

            <div className="flex items-center gap-1">
                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    disabled={currentPage === 1}
                    onClick={() =>
                        navigate(links.find((l) => l.label.includes("Previous"))?.url ?? null)
                    }
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {pageLinks.map((link) => (
                    <Button
                        key={link.page}
                        size="sm"
                        variant={link.active ? "default" : "outline"}
                        className="h-8 min-w-[2rem] px-2 text-xs"
                        onClick={() => navigate(link.url)}
                    >
                        {link.page}
                    </Button>
                ))}

                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    disabled={currentPage === lastPage}
                    onClick={() =>
                        navigate(links.find((l) => l.label.includes("Next"))?.url ?? null)
                    }
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

function CategoryCard({ category }: { category: Category }) {
    const style = getCategoryStyle(category.name);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            {/* Category header */}
            <div
                className={`flex items-center gap-2 border-b px-4 py-2.5 ${style.header}`}
            >
                <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}
                >
                    <Tag className="h-3 w-3" />
                    {enName(category.name)}
                </span>
            </div>

            {/* Parameters grid */}
            <div className="grid grid-cols-2 gap-px bg-gray-100 sm:grid-cols-3 lg:grid-cols-4 dark:bg-gray-800">
                {category.parameters.map((param) => (
                    <div
                        key={param.id}
                        className="flex flex-col gap-1 bg-white px-4 py-3 dark:bg-gray-900"
                    >
                        <p className="text-xs text-muted-foreground leading-tight">
                            {enName(param.name)}
                        </p>
                        <p className="text-base font-semibold tabular-nums text-gray-900 dark:text-white">
                            {parseFloat(param.value).toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                            })}
                            <span className="ml-1 text-xs font-normal text-muted-foreground">
                                {param.unit}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SessionCard({ session, index }: { session: Session; index: number }) {
    const [expanded, setExpanded] = useState(index === 0);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {/* Session header */}
            <button
                onClick={() => setExpanded((v) => !v)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-gray-50/80 dark:hover:bg-gray-800/40"
            >
                <div className="flex items-center gap-4">
                    {/* Session index badge */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-sm font-bold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                        #{session.id}
                    </div>

                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {formatDateShort(session.reading_at)}
                        </p>
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{formatDateTime(session.reading_at)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Badge variant="secondary">
                        {session.categories.length} categories
                    </Badge>
                    {expanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                </div>
            </button>

            {/* Expandable categories */}
            {expanded && (
                <div className="space-y-3 border-t border-gray-100 px-6 py-4 dark:border-gray-800">
                    {session.categories.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Date Filter Bar ────────────────────────────────────────────────────────────

function DateFilterBar({
    roUnitId,
    filters,
}: {
    roUnitId: number;
    filters: Filters;
}) {
    const [dateFrom, setDateFrom] = useState(filters.date_from ?? "");
    const [dateTo, setDateTo] = useState(filters.date_to ?? "");

    const hasFilters = !!(filters.date_from || filters.date_to);

    const apply = () => {
        router.visit(`/readings/ro-unit/${roUnitId}`, {
            data: {
                date_from: dateFrom || undefined,
                date_to: dateTo || undefined,
            },
            preserveScroll: false,
        });
    };

    const clear = () => {
        setDateFrom("");
        setDateTo("");
        router.visit(`/readings/ro-unit/${roUnitId}`, { preserveScroll: false });
    };

    return (
        <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <Filter className="mb-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            {/* From */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="date_from" className="text-xs">
                    From
                </Label>
                <Input
                    id="date_from"
                    type="date"
                    className="h-8 w-40 text-sm"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    max={dateTo || undefined}
                />
            </div>

            {/* To */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="date_to" className="text-xs">
                    To
                </Label>
                <Input
                    id="date_to"
                    type="date"
                    className="h-8 w-40 text-sm"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    min={dateFrom || undefined}
                />
            </div>

            <Button size="sm" onClick={apply} className="h-8">
                <CalendarDays className="mr-2 h-3.5 w-3.5" />
                Apply
            </Button>

            {hasFilters && (
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={clear}
                    className="h-8 text-muted-foreground hover:text-destructive"
                >
                    <X className="mr-1.5 h-3.5 w-3.5" />
                    Clear
                </Button>
            )}
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

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
                                <span className="font-medium">{total}</span> sessions
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

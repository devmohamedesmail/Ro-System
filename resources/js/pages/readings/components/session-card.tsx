import React, { useState } from 'react'

import ReadingCategoryCard from './reading-category-card';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import useImport from '@/hooks/use-import';

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

export default function SessionCard({ session, index }: { session: Session; index: number }) {
 const [expanded, setExpanded] = useState(index === 0);
 const {t}=useImport();
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
                        {session.categories.length} {t("common.categories")}
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
                        <ReadingCategoryCard key={cat.id} category={cat} />
                    ))}
                </div>
            )}
        </div>
  )
}

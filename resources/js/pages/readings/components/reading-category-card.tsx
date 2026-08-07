import { Category } from '@/types/ro';
import { Tag } from 'lucide-react';
import React from 'react'


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
export default function ReadingCategoryCard({ category }: { category: Category }) {
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
                    {/* {enName(category.name)}  */}
                    {category.name}
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
                            {/* {enName(param.name)} */}
                            {param.name}
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
    )
}

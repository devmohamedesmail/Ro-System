import React from "react";
import { Package, Pencil, Trash2, AlertTriangle, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useImport from "@/hooks/use-import";
import type { InventoryItem, Station } from "../types";

// ─── Props ─────────────────────────────────────────────────────────────────────

interface Props {
    stations: Station[];
    searchQuery: string;
    onEdit: (item: InventoryItem) => void;
    onDelete: (item: InventoryItem) => void;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function ItemTypeBadge({ type }: { type: string }) {
    const colorMap: Record<string, string> = {
        Chemical: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
        Filter: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        Membrane: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
        Pump: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
        Pipe: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
        Valve: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        Electrical: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
        "Spare Part": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        Other: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    };

    const colorClass =
        colorMap[type] ??
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
        >
            <Tag className="h-3 w-3" />
            {type}
        </span>
    );
}

function EmptyItems({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-10 text-center dark:border-gray-700">
            <Package className="mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
            <p className="text-sm text-muted-foreground">{message}</p>
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InventoryTable({
    stations,
    searchQuery,
    onEdit,
    onDelete,
}: Props) {
    const { t } = useImport();

    const filterItems = (items: InventoryItem[]): InventoryItem[] => {
        if (!searchQuery.trim()) return items;

        const q = searchQuery.toLowerCase();

        return items.filter(
            (item) =>
                item.name.toLowerCase().includes(q) ||
                item.code?.toLowerCase().includes(q) ||
                item.type.toLowerCase().includes(q)
        );
    };

    if (!stations.length) {
        return (
            <EmptyItems message={t("inventory.noStations")} />
        );
    }

    return (
        <div className="space-y-6">
            {stations.map((station) => {
                const filteredItems = filterItems(station.inventory?.items ?? []);

                return (
                    <div
                        key={station.id}
                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
                    >
                        {/* Station Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/60 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/40">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30">
                                    <Package className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-gray-900 dark:text-white">
                                        {station.name}
                                    </h2>
                                    <p className="text-xs text-muted-foreground">
                                        {station.inventory?.name}
                                    </p>
                                </div>
                            </div>

                            <Badge variant="secondary">
                                {t("inventory.itemsCount", {
                                    count: filteredItems.length,
                                })}
                            </Badge>
                        </div>

                        {/* Items Table */}
                        <div className="p-4">
                            {filteredItems.length === 0 ? (
                                <EmptyItems message={t("inventory.noItems")} />
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground dark:border-gray-800">
                                                <th className="pb-3 pl-2 pr-4 text-right">
                                                    {t("inventory.fields.name")}
                                                </th>
                                                <th className="pb-3 px-4 text-right">
                                                    {t("inventory.fields.code")}
                                                </th>
                                                <th className="pb-3 px-4 text-right">
                                                    {t("inventory.fields.type")}
                                                </th>
                                                <th className="pb-3 px-4 text-right">
                                                    {t("inventory.fields.unit")}
                                                </th>
                                                <th className="pb-3 px-4 text-right">
                                                    {t("inventory.fields.quantity")}
                                                </th>
                                                <th className="pb-3 px-4 text-right">
                                                    {t("inventory.actions.edit")} /&nbsp;
                                                    {t("inventory.actions.delete")}
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {filteredItems.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="group transition hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                                >
                                                    {/* Name */}
                                                    <td className="py-3 pl-2 pr-4">
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {item.name}
                                                        </span>
                                                    </td>

                                                    {/* Code */}
                                                    <td className="px-4 py-3">
                                                        {item.code ? (
                                                            <code className="rounded bg-gray-100 px-2 py-0.5 text-xs font-mono dark:bg-gray-800">
                                                                {item.code}
                                                            </code>
                                                        ) : (
                                                            <span className="text-muted-foreground">—</span>
                                                        )}
                                                    </td>

                                                    {/* Type */}
                                                    <td className="px-4 py-3">
                                                        <ItemTypeBadge type={item.type} />
                                                    </td>

                                                    {/* Unit */}
                                                    <td className="px-4 py-3 text-muted-foreground">
                                                        {t(`inventory.units.${item.unit}`, {
                                                            defaultValue: item.unit,
                                                        })}
                                                    </td>
                                                    <td className="px-4 py-3 text-muted-foreground">
                                                        {t(`inventory.units.${item.quantity}`, {
                                                            defaultValue: item.quantity,
                                                        })}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className="h-8 w-8 text-muted-foreground hover:text-blue-600"
                                                                onClick={() => onEdit(item)}
                                                                title={t("inventory.editItem")}
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>

                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                                onClick={() => onDelete(item)}
                                                                title={t("inventory.deleteItem")}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

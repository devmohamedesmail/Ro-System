import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Package, Plus, Search } from "lucide-react";

import { DashboardLayout } from "../dashboard/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useImport from "@/hooks/use-import";

import InventoryFormDialog from "./components/InventoryFormDialog";
import InventoryDeleteDialog from "./components/InventoryDeleteDialog";
import InventoryTable from "./components/InventoryTable";
import type { InventoryItem, Station } from "./types";

// ─── Props ─────────────────────────────────────────────────────────────────────

interface Props {
    stations: Station[];
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function InventoryPage({ stations }: Props) {
    const { t } = useImport();

    // ── Dialogs state ──
    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

    // ── Search state ──
    const [searchQuery, setSearchQuery] = useState("");

    // ── Handlers ──
    const openCreate = () => {
        setSelectedItem(null);
        setFormOpen(true);
    };

    const openEdit = (item: InventoryItem) => {
        setSelectedItem(item);
        setFormOpen(true);
    };

    const openDelete = (item: InventoryItem) => {
        setSelectedItem(item);
        setDeleteOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setSelectedItem(null);
    };

    const closeDelete = () => {
        setDeleteOpen(false);
        setSelectedItem(null);
    };

    return (
        <DashboardLayout>
            <Head title={t("inventory.title")} />

            <div className="space-y-6 p-6">
                {/* ── Page Header ─────────────────────────────────────── */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30">
                            <Package className="h-6 w-6" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {t("inventory.title")}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {t("inventory.subtitle")}
                            </p>
                        </div>
                    </div>

                    <Button onClick={openCreate} className="shrink-0">
                        <Plus className="mr-2 h-4 w-4" />
                        {t("inventory.addItem")}
                    </Button>
                </div>

                {/* ── Search Bar ──────────────────────────────────────── */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        className="pl-9"
                        placeholder={t("inventory.searchPlaceholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* ── Inventory Table ─────────────────────────────────── */}
                <InventoryTable
                    stations={stations}
                    searchQuery={searchQuery}
                    onEdit={openEdit}
                    onDelete={openDelete}
                />
            </div>

            {/* ── Dialogs ─────────────────────────────────────────────── */}
            <InventoryFormDialog
                open={formOpen}
                onClose={closeForm}
                stations={stations}
                item={selectedItem}
            />

            <InventoryDeleteDialog
                open={deleteOpen}
                onClose={closeDelete}
                item={selectedItem}
            />
        </DashboardLayout>
    );
}

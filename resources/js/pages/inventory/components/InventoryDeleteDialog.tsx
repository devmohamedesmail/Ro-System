import React from "react";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import { AlertTriangle } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useImport from "@/hooks/use-import";
import type { InventoryItem } from "../types";

// ─── Props ─────────────────────────────────────────────────────────────────────

interface Props {
    open: boolean;
    onClose: () => void;
    item: InventoryItem | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InventoryDeleteDialog({ open, onClose, item }: Props) {
    const { t } = useImport();
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = () => {
        if (!item) return;

        setIsDeleting(true);

        router.delete(`/inventories/items/${item.id}`, {
            onSuccess() {
                toast.success(t("inventory.toast.deleted"));
                onClose();
            },
            onError() {
                toast.error(t("inventory.toast.error"));
            },
            onFinish() {
                setIsDeleting(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        {t("inventory.delete.title")}
                    </DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">
                    {t("inventory.delete.message", { name: item?.name ?? "" })}
                </p>

                <DialogFooter>
                    <Button variant="outline" type="button" onClick={onClose}>
                        {t("inventory.actions.cancel")}
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting
                            ? t("inventory.actions.saving")
                            : t("inventory.actions.confirm")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

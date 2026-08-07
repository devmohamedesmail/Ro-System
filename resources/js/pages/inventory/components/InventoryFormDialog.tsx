import React from "react";
import { router } from "@inertiajs/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useImport from "@/hooks/use-import";
import type { InventoryItem, Station } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const ITEM_TYPES = [
    "Chemical",
    "Filter",
    "Membrane",
    "Pump",
    "Pipe",
    "Valve",
    "Electrical",
    "Spare Part",
    "Other",
] as const;

const ITEM_UNITS = [
    "Piece",
    "Kg",
    "Liter",
    "Meter",
    "Box",
    "Bottle",
    "Pack",
] as const;

// ─── Props ─────────────────────────────────────────────────────────────────────

interface Props {
    open: boolean;
    onClose: () => void;
    stations: Station[];
    item?: InventoryItem | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InventoryFormDialog({
    open,
    onClose,
    stations = [],
    item = null,
}: Props) {
    const { t } = useImport();
    const isEdit = !!item;

    // Find the inventory_id from the station that owns this item
    const getInventoryId = (): string => {
        if (!item) return "";
        const station = stations.find((s) => s.inventory?.id === item.inventory_id);
        return station?.inventory?.id?.toString() ?? "";
    };

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            inventory_id: getInventoryId(),
            name: item?.name ?? "",
            code: item?.code ?? "",
            type: item?.type ?? "",
            unit: item?.unit ?? "Piece",
            quantity:item?.quantity ?? "",
            description: item?.description ?? "",
        },

        validationSchema: Yup.object({
            inventory_id: Yup.string().required(t("validation.required")),
            name: Yup.string().required(t("validation.required")),
            type: Yup.string().required(t("validation.required")),
            unit: Yup.string().required(t("validation.required")),
        }),

        onSubmit(values, { resetForm, setSubmitting }) {
            const payload = {
                inventory_id: values.inventory_id,
                name: values.name,
                code: values.code,
                type: values.type,
                unit: values.unit,
                quantity: values.quantity,
                description: values.description,
            };

            if (isEdit) {
                router.put(`/inventories/update/items/${item!.id}`, payload, {
                    onSuccess() {
                        toast.success(t("inventory.toast.updated"));
                        resetForm();
                        onClose();
                    },
                    onError() {
                        toast.error(t("inventory.toast.error"));
                    },
                    onFinish() {
                        setSubmitting(false);
                    },
                });
            } else {
                router.post("/inventories/store", payload, {
                    onSuccess() {
                        toast.success(t("inventory.toast.created"));
                        resetForm();
                        onClose();
                    },
                    onError() {
                        toast.error(t("inventory.toast.error"));
                    },
                    onFinish() {
                        setSubmitting(false);
                    },
                });
            }
        },
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit
                            ? t("inventory.editItem")
                            : t("inventory.addItem")}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Station (Inventory) */}
                    <div className="space-y-1">
                        <Label htmlFor="inventory_id">
                            {t("inventory.fields.station")}
                        </Label>

                        <Select
                            value={formik.values.inventory_id}
                            onValueChange={(value) =>
                                formik.setFieldValue("inventory_id", value)
                            }
                        >
                            <SelectTrigger id="inventory_id" className="w-full">
                                <SelectValue
                                    placeholder={t("inventory.fields.selectStation")}
                                />
                            </SelectTrigger>

                            <SelectContent>
                                {stations.map((station) => (
                                    <SelectItem
                                        key={station.id}
                                        value={station.inventory?.id?.toString() ?? ""}
                                    >
                                        {station.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError
                            message={
                                formik.touched.inventory_id
                                    ? (formik.errors.inventory_id as string)
                                    : undefined
                            }
                        />
                    </div>

                    {/* Name */}
                    <div className="space-y-1">
                        <Label htmlFor="name">{t("inventory.fields.name")}</Label>

                        <Input
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        <InputError
                            message={
                                formik.touched.name
                                    ? formik.errors.name
                                    : undefined
                            }
                        />
                    </div>

                    {/* Code */}
                    <div className="space-y-1">
                        <Label htmlFor="code">{t("inventory.fields.code")}</Label>

                        <Input
                            id="code"
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="quantity">{t("inventory.fields.quantity")}</Label>

                        <Input
                            id="quantity"
                            name="quantity"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/* Type & Unit — side by side */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Type */}
                        <div className="space-y-1">
                            <Label htmlFor="type">{t("inventory.fields.type")}</Label>

                            <Select
                                value={formik.values.type}
                                onValueChange={(v) =>
                                    formik.setFieldValue("type", v)
                                }
                            >
                                <SelectTrigger id="type" className="w-full">
                                    <SelectValue
                                        placeholder={t("inventory.fields.selectType")}
                                    />
                                </SelectTrigger>

                                <SelectContent>
                                    {ITEM_TYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {t(`inventory.types.${type.replace(" ", "")}`, { defaultValue: type })}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError
                                message={
                                    formik.touched.type
                                        ? formik.errors.type
                                        : undefined
                                }
                            />
                        </div>

                        {/* Unit */}
                        <div className="space-y-1">
                            <Label htmlFor="unit">{t("inventory.fields.unit")}</Label>

                            <Select
                                value={formik.values.unit}
                                onValueChange={(v) =>
                                    formik.setFieldValue("unit", v)
                                }
                            >
                                <SelectTrigger id="unit" className="w-full">
                                    <SelectValue
                                        placeholder={t("inventory.fields.selectUnit")}
                                    />
                                </SelectTrigger>

                                <SelectContent>
                                    {ITEM_UNITS.map((unit) => (
                                        <SelectItem key={unit} value={unit}>
                                            {t(`inventory.units.${unit}`, { defaultValue: unit })}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError
                                message={
                                    formik.touched.unit
                                        ? formik.errors.unit
                                        : undefined
                                }
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <Label htmlFor="description">
                            {t("inventory.fields.description")}
                        </Label>

                        <Textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={handleClose}
                        >
                            {t("inventory.actions.cancel")}
                        </Button>

                        <Button type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting
                                ? t("inventory.actions.saving")
                                : t("inventory.actions.save")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
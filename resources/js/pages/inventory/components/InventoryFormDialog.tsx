import React from "react";
import { router } from "@inertiajs/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

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
import InputError from "@/components/input-error";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useImport from "@/hooks/use-import";

interface Station {
    id: number;
    name: string;
}

interface Inventory {
    id: number;
    name: string;
    code?: string;
    type?: string;
    unit: string;
    description?: string;
    station_id?: number | null;
}

interface Props {
    open: boolean;
    onClose: () => void;
    stations: Station[];
    inventory?: Inventory | null;
}

const TYPES = [
    "Chemical",
    "Filter",
    "Membrane",
    "Pump",
    "Pipe",
    "Valve",
    "Electrical",
    "Spare Part",
    "Other",
];

const UNITS = [
    "Piece",
    "Kg",
    "Liter",
    "Meter",
    "Box",
    "Bottle",
    "Pack",
];

export default function InventoryFormDialog({ open, onClose, stations = [], inventory = null }: Props) {

    const { t } = useImport();
    console.log(stations)
    const isEdit = !!inventory;

    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
           inventory_id: inventory?.id ?? null,
            name: inventory?.name ?? "",
            code: inventory?.code ?? "",
            type: inventory?.type ?? "",
            unit: inventory?.unit ?? "Piece",
            description: inventory?.description ?? "",
        },

        validationSchema: Yup.object({
            name: Yup.string().required(t("validation.required")),
            type: Yup.string().required(t("validation.required")),
            unit: Yup.string().required(t("validation.required")),
            inventory_id: Yup.string().required(t("validation.required")),
        }),

        onSubmit(values, { resetForm, setSubmitting }) {
console.log("values",values)
            const payload = {
                name: values.name,
                code: values.code,
                type: values.type,
                unit: values.unit,
                description: values.description,
                inventory_id: values.inventory_id,
            };

            if (isEdit) {

                router.put(`/inventories/${inventory.id}`, payload, {

                    onSuccess() {

                        toast.success("Inventory updated");

                        resetForm();

                        onClose();

                    },

                    onError() {

                        toast.error("Something went wrong");

                    },

                    onFinish() {

                        setSubmitting(false);

                    },

                });

            } else {

                router.post("/inventories/store", payload, {

                    onSuccess() {

                        toast.success("Inventory created");

                        resetForm();

                        onClose();

                    },

                    onError(errors) {

                        toast.error("Something went wrong");
                        console.log(errors)

                    },

                    onFinish() {

                        setSubmitting(false);

                    },

                });

            }

        },

    });

    return (

        <Dialog open={open} onOpenChange={onClose}>

            <DialogContent className="max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        {isEdit ? "Edit Inventory" : "Create Inventory"}

                    </DialogTitle>

                </DialogHeader>

                <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-4"
                >

                    <div className="space-y-1">
                        <Label>{t('users.fields.role')}</Label>

                        <Select
                            value={formik.values.inventory_id}
                            onValueChange={(value) => {
                                console.log("value",value)
                                formik.setFieldValue('inventory_id', value)
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t('users.fields.selectRole')} />
                            </SelectTrigger>

                            <SelectContent>
                                {stations?.map((station) => (
                                    <SelectItem
                                        key={station.id}
                                        value={station?.id.toString()}
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

                    <div>

                        <Label>Name</Label>

                        <Input
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

                    <div>

                        <Label>Code</Label>

                        <Input
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                        />

                    </div>

                    <div>

                        <Label>Type</Label>

                        <Select
                            value={formik.values.type}
                            onValueChange={(v) =>
                                formik.setFieldValue("type", v)
                            }
                        >

                            <SelectTrigger className="w-full">

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {TYPES.map(type => (

                                    <SelectItem
                                        key={type}
                                        value={type}
                                    >
                                        {type}
                                    </SelectItem>

                                ))}

                            </SelectContent>

                        </Select>

                    </div>

                    <div>

                        <Label>Unit</Label>

                        <Select
                            value={formik.values.unit}
                            onValueChange={(v) =>
                                formik.setFieldValue("unit", v)
                            }
                        >

                            <SelectTrigger className="w-full">

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {UNITS.map(unit => (

                                    <SelectItem
                                        key={unit}
                                        value={unit}
                                    >
                                        {unit}
                                    </SelectItem>

                                ))}

                            </SelectContent>

                        </Select>

                    </div>

                    <div>

                        <Label>Location</Label>

                        <Select
                            value={formik.values.location}
                            onValueChange={(v) =>
                                formik.setFieldValue("location", v)
                            }
                        >

                            <SelectTrigger className="w-full">

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="company">

                                    Main Warehouse

                                </SelectItem>

                                {stations.map(station => (

                                    <SelectItem
                                        key={station.id}
                                        value={station.id.toString()}
                                    >
                                        {station.name}
                                    </SelectItem>

                                ))}

                            </SelectContent>

                        </Select>

                    </div>

                    <div>

                        <Label>Description</Label>

                        <Input
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />

                    </div>

                    <DialogFooter>

                        <Button
                            variant="outline"
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting
                                ? "Saving..."
                                : "Save"}
                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>

    );

}
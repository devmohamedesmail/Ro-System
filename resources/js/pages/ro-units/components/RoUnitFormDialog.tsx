import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';

interface Station {
    id: number;
    name: string;
    code: string;
}

interface RoUnit {
    id: number;
    station_id: number;
    name: string;
    code: string | null;
    capacity: number | null;
    description: string | null;
    serial_number: string | null;
    manufacturer: string | null;
    is_active: boolean;
}

interface RoUnitFormDialogProps {
    open: boolean;
    onClose: () => void;
    stations: Station[];
    roUnit?: RoUnit | null;
}

export function RoUnitFormDialog({ open, onClose, stations, roUnit }: RoUnitFormDialogProps) {
    const { t } = useTranslation();
    const isEdit = !!roUnit;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            station_id: roUnit?.station_id?.toString() ?? '',
            name: roUnit?.name ?? '',
            code: roUnit?.code ?? '',
            capacity: roUnit?.capacity?.toString() ?? '',
            serial_number: roUnit?.serial_number ?? '',
            manufacturer: roUnit?.manufacturer ?? '',
            description: roUnit?.description ?? '',
        },
        validationSchema: Yup.object({
            station_id: Yup.string().required(t('validation.required')),
            name: Yup.string().required(t('validation.required')),
            code: Yup.string().nullable(),
            capacity: Yup.number().nullable().min(0),
            serial_number: Yup.string().nullable(),
            manufacturer: Yup.string().nullable(),
            description: Yup.string().nullable(),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            const payload = {
                ...values,
                station_id: Number(values.station_id),
                capacity: values.capacity ? Number(values.capacity) : null,
            };

            if (isEdit) {
                router.put(`/ro-units/${roUnit!.id}`, payload, {
                    onSuccess: () => {
                        toast.success(t('ro-units.updateSuccess'));
                        resetForm();
                        onClose();
                    },
                    onError: () => toast.error(t('common.error')),
                    onFinish: () => setSubmitting(false),
                });
            } else {
                router.post('/ro-units/store', payload, {
                    onSuccess: () => {
                        toast.success(t('ro-units.createSuccess'));
                        resetForm();
                        onClose();
                    },
                    onError: () => toast.error(t('common.error')),
                    onFinish: () => setSubmitting(false),
                });
            }
        },
    });

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? t('ro-units.edit') : t('ro-units.create')}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Station Selector */}
                    <div className="space-y-1">
                        <Label>{t('ro-units.fields.station')}</Label>
                        <Select
                            value={formik.values.station_id}
                            onValueChange={(val) => formik.setFieldValue('station_id', val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('ro-units.fields.station')} />
                            </SelectTrigger>
                            <SelectContent>
                                {stations.map((s) => (
                                    <SelectItem key={s.id} value={s.id.toString()}>
                                        {s.name} ({s.code})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={formik.touched.station_id ? formik.errors.station_id : undefined} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>{t('ro-units.fields.name')}</Label>
                            <Input
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <InputError message={formik.touched.name ? formik.errors.name : undefined} />
                        </div>

                        <div className="space-y-1">
                            <Label>{t('ro-units.fields.code')}</Label>
                            <Input
                                name="code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t('common.loading')}
                            />
                            <InputError message={formik.touched.code ? formik.errors.code : undefined} />
                        </div>

                        <div className="space-y-1">
                            <Label>{t('ro-units.fields.capacity')}</Label>
                            <Input
                                name="capacity"
                                type="number"
                                value={formik.values.capacity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                min={0}
                                step="0.01"
                            />
                            <InputError message={formik.touched.capacity ? formik.errors.capacity as string : undefined} />
                        </div>

                        <div className="space-y-1">
                            <Label>{t('ro-units.fields.manufacturer')}</Label>
                            <Input
                                name="manufacturer"
                                value={formik.values.manufacturer}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>{t('ro-units.fields.serialNumber')}</Label>
                            <Input
                                name="serial_number"
                                value={formik.values.serial_number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label>{t('ro-units.fields.description')}</Label>
                        <Textarea
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="min-h-[80px]"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? t('common.loading') : t('common.save')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

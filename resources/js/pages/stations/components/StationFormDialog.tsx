import React, { useState } from 'react';
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
import InputError from '@/components/input-error';
import useImport from '@/hooks/use-import';


interface Station {
    id: number;
    name: string;
    code: string;
    phone: string | null;
    city: string | null;
    country: string | null;
    address: string | null;
    is_active: boolean;
}

interface StationFormDialogProps {
    open: boolean;
    onClose: () => void;
    station?: Station | null;
}

export function StationFormDialog({ open, onClose, station }: StationFormDialogProps) {
    const { t } = useImport();
    const isEdit = !!station;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: station?.name ?? '',
            phone: station?.phone ?? '',
            city: station?.city ?? '',
            country: station?.country ?? '',
            address: station?.address ?? '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('validation.required')),
            phone: Yup.string().nullable(),
            city: Yup.string().nullable(),
            country: Yup.string().nullable(),
            address: Yup.string().nullable(),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            if (isEdit) {
                router.put(`/stations/${station!.id}`, values, {
                    onSuccess: () => {
                        toast.success(t('stations.updateSuccess'));
                        resetForm();
                        onClose();
                    },
                    onError: () => toast.error(t('common.error')),
                    onFinish: () => setSubmitting(false),
                });
            } else {
                router.post('/stations/store', values, {
                    onSuccess: () => {
                        toast.success(t('stations.createSuccess'));
                        resetForm();
                        onClose();
                    },
                    onError: (errors) => {
                        toast.error(t('stations.createFailed'))
                        console.log("Error", errors)
                    },
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
                        {isEdit ? t('stations.edit') : t('stations.create')}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>{t('stations.fields.name')}</Label>
                            <Input
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <InputError message={formik.touched.name ? formik.errors.name : undefined} />
                        </div>

                        <div className="space-y-1">
                            <Label>{t('stations.fields.phone')}</Label>
                            <Input
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <InputError message={formik.touched.phone ? formik.errors.phone : undefined} />
                        </div>

                        {/* <div className="space-y-1">
                            <Label>{t('stations.fields.city')}</Label>
                            <Input
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <InputError message={formik.touched.city ? formik.errors.city : undefined} />
                        </div> */}

                        {/* <div className="space-y-1">
                            <Label>{t('stations.fields.country')}</Label>
                            <Input
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <InputError message={formik.touched.country ? formik.errors.country : undefined} />
                        </div> */}
                    </div>

                    <div className="space-y-1">
                        <Label>{t('stations.fields.address')}</Label>
                        <Textarea
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="min-h-[80px]"
                        />
                        <InputError message={formik.touched.address ? formik.errors.address : undefined} />
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

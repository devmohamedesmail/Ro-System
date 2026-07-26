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
import InputError from '@/components/input-error';
import { Category, Parameter, RoUnit } from '@/types/ro';


interface CategoryFormDialogProps {
    open: boolean;
    onClose: () => void;
    category?: Category | null;
}

export function CategoryFormDialog({ open, onClose, category }: CategoryFormDialogProps) {
    const { t } = useTranslation();
    const isEdit = !!category;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: category?.name ?? '',
            order: category?.order?.toString() ?? '0',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('validation.required')),
            order: Yup.number().min(0),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            const payload = { name: values.name, order: Number(values.order) };

            if (isEdit) {
                router.put(`/reading-categories/${category!.id}`, payload, {
                    onSuccess: () => {
                        toast.success(t('ro-settings.updateCategorySuccess'));
                        resetForm();
                        onClose();
                    },
                    onError: () => toast.error(t('common.error')),
                    onFinish: () => setSubmitting(false),
                });
            } else {
                router.post('/reading-categories', payload, {
                    onSuccess: () => {
                        toast.success(t('ro-settings.createCategorySuccess'));
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
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? t('ro-settings.editCategory') : t('ro-settings.addCategory')}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <Label>{t('ro-settings.fields.categoryName')}</Label>
                        <Input
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoFocus
                        />
                        <InputError message={formik.touched.name ? formik.errors.name : undefined} />
                    </div>

                    <div className="space-y-1">
                        <Label>{t('ro-settings.fields.order')}</Label>
                        <Input
                            name="order"
                            type="number"
                            min={0}
                            value={formik.values.order}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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

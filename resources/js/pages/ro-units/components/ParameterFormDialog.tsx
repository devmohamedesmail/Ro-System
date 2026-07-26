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
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';

interface Parameter {
    id: number;
    name: string;
    code: string | null;
    unit: string | null;
    input_type: 'NUMBER' | 'TEXT' | 'BOOLEAN';
    usage: 'READING' | 'DAILY_REPORT' | 'BOTH';
    track_difference: boolean;
    min_value: number | null;
    max_value: number | null;
    order: number;
    is_required: boolean;
    is_active: boolean;
}

interface ParameterFormDialogProps {
    open: boolean;
    onClose: () => void;
    categoryId: number;
    parameter?: Parameter | null;
}

export function ParameterFormDialog({ open, onClose, categoryId, parameter }: ParameterFormDialogProps) {
    const { t } = useTranslation();
    const isEdit = !!parameter;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: parameter?.name ?? '',
            code: parameter?.code ?? '',
            unit: parameter?.unit ?? '',
            input_type: parameter?.input_type ?? 'NUMBER',
            usage: parameter?.usage ?? 'READING',
            track_difference: parameter?.track_difference ?? false,
            min_value: parameter?.min_value?.toString() ?? '',
            max_value: parameter?.max_value?.toString() ?? '',
            order: parameter?.order?.toString() ?? '0',
            is_required: parameter?.is_required ?? false,
            is_active: parameter?.is_active ?? true,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('validation.required')),
            code: Yup.string().nullable(),
            unit: Yup.string().nullable(),
            input_type: Yup.string().oneOf(['NUMBER', 'TEXT', 'BOOLEAN']).required(),
            usage: Yup.string().oneOf(['READING', 'DAILY_REPORT', 'BOTH']).required(),
            track_difference: Yup.boolean(),
            min_value: Yup.number().nullable(),
            max_value: Yup.number().nullable(),
            order: Yup.number().min(0),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            const payload = {
                name: values.name,
                code: values.code || null,
                unit: values.unit || null,
                input_type: values.input_type,
                usage: values.usage,
                track_difference: values.track_difference,
                min_value: values.min_value !== '' ? Number(values.min_value) : null,
                max_value: values.max_value !== '' ? Number(values.max_value) : null,
                order: Number(values.order),
                is_required: values.is_required,
                is_active: values.is_active,
            };

            if (isEdit) {
                router.put(`/reading-categories/parameters/${parameter!.id}`, payload, {
                    onSuccess: () => {
                        toast.success(t('ro-settings.updateParameterSuccess'));
                        resetForm();
                        onClose();
                    },
                    onError: () => toast.error(t('common.error')),
                    onFinish: () => setSubmitting(false),
                });
            } else {
                router.post(`/reading-categories/${categoryId}/parameters`, payload, {
                    onSuccess: () => {
                        toast.success(t('ro-settings.createParameterSuccess'));
                        resetForm();
                        onClose();
                    },
                    onError: () => toast.error(t('common.error')),
                    onFinish: () => setSubmitting(false),
                });
            }
        },
    });

    const isNumber = formik.values.input_type === 'NUMBER';

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? t('ro-settings.editParameter') : t('ro-settings.addParameter')}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>{t('ro-settings.fields.paramName')}</Label>
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
                            <Label>{t('ro-settings.fields.code')}</Label>
                            <Input
                                name="code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>{t('ro-settings.fields.inputType')}</Label>
                            <Select
                                value={formik.values.input_type}
                                onValueChange={(v) => formik.setFieldValue('input_type', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {(['NUMBER', 'TEXT', 'BOOLEAN'] as const).map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {t(`ro-settings.inputTypes.${type}`)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>


                        {/* place to show */}
                        <div className="space-y-1">
                            <Label>
                                {t('ro-settings.fields.usage')}
                            </Label>

                            <Select
                                value={formik.values.usage}
                                onValueChange={(v) =>
                                    formik.setFieldValue('usage', v)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    {(['READING', 'DAILY_REPORT', 'BOTH'] as const).map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {t(`ro-settings.usage.${type}`)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label>{t('ro-settings.fields.unit')}</Label>
                            <Input
                                name="unit"
                                value={formik.values.unit}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="ppm, bar, °C"
                                disabled={formik.values.input_type === 'BOOLEAN'}
                            />
                        </div>

                        {isNumber && (
                            <>
                                <div className="space-y-1">
                                    <Label>{t('ro-settings.fields.minValue')}</Label>
                                    <Input
                                        name="min_value"
                                        type="number"
                                        step="any"
                                        value={formik.values.min_value}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>{t('ro-settings.fields.maxValue')}</Label>
                                    <Input
                                        name="max_value"
                                        type="number"
                                        step="any"
                                        value={formik.values.max_value}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </>
                        )}

                        <div className="space-y-1">
                            <Label>{t('ro-settings.fields.order')}</Label>
                            <Input
                                name="order"
                                type="number"
                                min={0}
                                value={formik.values.order}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <label className="flex cursor-pointer items-center gap-2 text-sm">
                            <Checkbox
                                checked={formik.values.is_required}
                                onCheckedChange={(v) => formik.setFieldValue('is_required', !!v)}
                                id="param-required"
                            />
                            <span>{t('ro-settings.fields.isRequired')}</span>
                        </label>

                        {isEdit && (
                            <label className="flex cursor-pointer items-center gap-2 text-sm">
                                <Checkbox
                                    checked={formik.values.is_active}
                                    onCheckedChange={(v) => formik.setFieldValue('is_active', !!v)}
                                    id="param-active"
                                />
                                <span>{t('ro-settings.fields.isActive')}</span>
                            </label>
                        )}







                        <label className="flex cursor-pointer items-center gap-2 text-sm">
                            <Checkbox
                                checked={formik.values.track_difference}
                                onCheckedChange={(v) =>
                                    formik.setFieldValue(
                                        'track_difference',
                                        !!v
                                    )
                                }
                                id="track-difference"
                            />

                            <span>
                                {t('ro-settings.fields.trackDifference')}
                            </span>
                        </label>
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

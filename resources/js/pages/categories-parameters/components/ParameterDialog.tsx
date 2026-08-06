import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ReadingCategory, ReadingParameter, ParameterInputType, UsageType } from '../types';
import { Sliders, Pencil } from 'lucide-react';
import { toast } from 'sonner';

interface ParameterDialogProps {
    open: boolean;
    onClose: () => void;
    category: ReadingCategory;
    parameter?: ReadingParameter | null;
}

export function ParameterDialog({ open, onClose, category, parameter }: ParameterDialogProps) {
    const { t } = useTranslation();
    const isEditing = Boolean(parameter);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<{
        name: string;
        code: string;
        unit: string;
        input_type: ParameterInputType;
        usage: UsageType;
        min_value: string;
        max_value: string;
        track_difference: boolean;
        order: number;
        is_required: boolean;
        is_active: boolean;
    }>({
        name: '',
        code: '',
        unit: '',
        input_type: 'NUMBER',
        usage: category.usage || 'READING',
        min_value: '',
        max_value: '',
        track_difference: false,
        order: 0,
        is_required: false,
        is_active: true,
    });

    useEffect(() => {
        if (open) {
            clearErrors();
            if (parameter) {
                setData({
                    name: parameter.name || '',
                    code: parameter.code || '',
                    unit: parameter.unit || '',
                    input_type: parameter.input_type || 'NUMBER',
                    usage: parameter.usage || category.usage || 'READING',
                    min_value: parameter.min_value !== null && parameter.min_value !== undefined ? String(parameter.min_value) : '',
                    max_value: parameter.max_value !== null && parameter.max_value !== undefined ? String(parameter.max_value) : '',
                    track_difference: parameter.track_difference ?? false,
                    order: parameter.order ?? 0,
                    is_required: parameter.is_required ?? false,
                    is_active: parameter.is_active ?? true,
                });
            } else {
                reset();
                setData('usage', category.usage || 'READING');
            }
        }
    }, [open, parameter, category]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...data,
            min_value: data.min_value !== '' ? parseFloat(data.min_value) : null,
            max_value: data.max_value !== '' ? parseFloat(data.max_value) : null,
        };

        if (isEditing && parameter) {
            put(`/categories/parameters/${parameter.id}`, {
                data: payload,
                onSuccess: () => {
                    toast.success(t('categories_page.toastParameterUpdated'));
                    onClose();
                },
            });
        } else {
            post(`/categories/${category.id}/parameters`, {
                data: payload,
                onSuccess: () => {
                    toast.success(t('categories_page.toastParameterCreated'));
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                        {isEditing ? (
                            <>
                                <Pencil className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                {t('categories_page.editParameter')} &mdash; {category.name}
                            </>
                        ) : (
                            <>
                                <Sliders className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                {t('categories_page.addParameter')} &mdash; {category.name}
                            </>
                        )}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    {/* Parameter Name */}
                    <div className="space-y-1.5">
                        <Label htmlFor="param_name" className="text-sm font-medium">
                            {t('categories_page.parameterName')} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="param_name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={t('categories_page.parameterName')}
                            required
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    {/* Code & Unit */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="param_code" className="text-sm font-medium">
                                {t('categories_page.parameterCode')}
                            </Label>
                            <Input
                                id="param_code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                placeholder="e.g. TDS_FEED"
                            />
                            {errors.code && <p className="text-xs text-red-500">{errors.code}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="unit" className="text-sm font-medium">
                                {t('categories_page.unit')}
                            </Label>
                            <Input
                                id="unit"
                                value={data.unit}
                                onChange={(e) => setData('unit', e.target.value)}
                                placeholder="e.g. ppm, bar, pH, m³/h"
                            />
                            {errors.unit && <p className="text-xs text-red-500">{errors.unit}</p>}
                        </div>
                    </div>

                    {/* Input Type & Usage */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="input_type" className="text-sm font-medium">
                                {t('categories_page.inputType')} <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={data.input_type}
                                onValueChange={(val) => setData('input_type', val as ParameterInputType)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="NUMBER">
                                        {t('categories_page.inputTypeNumber')}
                                    </SelectItem>
                                    <SelectItem value="TEXT">
                                        {t('categories_page.inputTypeText')}
                                    </SelectItem>
                                    <SelectItem value="BOOLEAN">
                                        {t('categories_page.inputTypeBoolean')}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.input_type && <p className="text-xs text-red-500">{errors.input_type}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="param_usage" className="text-sm font-medium">
                                {t('categories_page.usage')}
                            </Label>
                            <Select
                                value={data.usage}
                                onValueChange={(val) => setData('usage', val as UsageType)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="READING">
                                        {t('categories_page.usageReading')}
                                    </SelectItem>
                                    <SelectItem value="DAILY_REPORT">
                                        {t('categories_page.usageDailyReport')}
                                    </SelectItem>
                                    <SelectItem value="BOTH">
                                        {t('categories_page.usageBoth')}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.usage && <p className="text-xs text-red-500">{errors.usage}</p>}
                        </div>
                    </div>

                    {/* Numeric Min / Max Bounds (Only if NUMBER) */}
                    {data.input_type === 'NUMBER' && (
                        <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                            <div className="space-y-1.5">
                                <Label htmlFor="min_value" className="text-xs font-medium">
                                    {t('categories_page.minValue')}
                                </Label>
                                <Input
                                    id="min_value"
                                    type="number"
                                    step="any"
                                    value={data.min_value}
                                    onChange={(e) => setData('min_value', e.target.value)}
                                    placeholder="0.00"
                                />
                                {errors.min_value && <p className="text-xs text-red-500">{errors.min_value}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="max_value" className="text-xs font-medium">
                                    {t('categories_page.maxValue')}
                                </Label>
                                <Input
                                    id="max_value"
                                    type="number"
                                    step="any"
                                    value={data.max_value}
                                    onChange={(e) => setData('max_value', e.target.value)}
                                    placeholder="100.00"
                                />
                                {errors.max_value && <p className="text-xs text-red-500">{errors.max_value}</p>}
                            </div>
                        </div>
                    )}

                    {/* Order */}
                    <div className="space-y-1.5">
                        <Label htmlFor="param_order" className="text-sm font-medium">
                            {t('categories_page.order')}
                        </Label>
                        <Input
                            id="param_order"
                            type="number"
                            min={0}
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                        />
                        {errors.order && <p className="text-xs text-red-500">{errors.order}</p>}
                    </div>

                    {/* Checkboxes: track_difference, is_required, is_active */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="track_difference"
                                checked={data.track_difference}
                                onCheckedChange={(checked) => setData('track_difference', Boolean(checked))}
                            />
                            <Label htmlFor="track_difference" className="cursor-pointer text-xs font-medium">
                                {t('categories_page.trackDifference')}
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="is_required"
                                checked={data.is_required}
                                onCheckedChange={(checked) => setData('is_required', Boolean(checked))}
                            />
                            <Label htmlFor="is_required" className="cursor-pointer text-xs font-medium">
                                {t('categories_page.isRequired')}
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="param_is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData('is_active', Boolean(checked))}
                            />
                            <Label htmlFor="param_is_active" className="cursor-pointer text-xs font-medium">
                                {t('categories_page.isActive')}
                            </Label>
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-indigo-600 hover:bg-indigo-700">
                            {processing ? t('common.loading') : isEditing ? t('common.update') : t('common.create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

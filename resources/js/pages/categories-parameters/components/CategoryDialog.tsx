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
import { ReadingCategory, UsageType } from '../types';
import { FolderPlus, Pencil } from 'lucide-react';
import { toast } from 'sonner';

interface CategoryDialogProps {
    open: boolean;
    onClose: () => void;
    category?: ReadingCategory | null;
}

export function CategoryDialog({ open, onClose, category }: CategoryDialogProps) {
    const { t } = useTranslation();
    const isEditing = Boolean(category);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<{
        name: string;
        code: string;
        icon: string;
        order: number;
        usage: UsageType;
        is_active: boolean;
    }>({
        name: '',
        code: '',
        icon: '',
        order: 0,
        usage: 'READING',
        is_active: true,
    });

    useEffect(() => {
        if (open) {
            clearErrors();
            if (category) {
                setData({
                    name: category.name || '',
                    code: category.code || '',
                    icon: category.icon || '',
                    order: category.order ?? 0,
                    usage: category.usage || 'READING',
                    is_active: category.is_active ?? true,
                });
            } else {
                reset();
            }
        }
    }, [open, category]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && category) {
            put(`/categories/${category.id}`, {
                onSuccess: () => {
                    toast.success(t('categories_page.toastCategoryUpdated'));
                    onClose();
                },
            });
        } else {
            post('/categories', {
                onSuccess: () => {
                    toast.success(t('categories_page.toastCategoryCreated'));
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                        {isEditing ? (
                            <>
                                <Pencil className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                {t('categories_page.editCategory')}
                            </>
                        ) : (
                            <>
                                <FolderPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                {t('categories_page.addCategory')}
                            </>
                        )}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    {/* Category Name */}
                    <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-sm font-medium">
                            {t('categories_page.categoryName')} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={t('categories_page.categoryName')}
                            required
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    {/* Code & Icon */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="code" className="text-sm font-medium">
                                {t('categories_page.categoryCode')}
                            </Label>
                            <Input
                                id="code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                placeholder="e.g. CAT_WATER_QUAL"
                            />
                            {errors.code && <p className="text-xs text-red-500">{errors.code}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="icon" className="text-sm font-medium">
                                {t('categories_page.categoryIcon')}
                            </Label>
                            <Input
                                id="icon"
                                value={data.icon}
                                onChange={(e) => setData('icon', e.target.value)}
                                placeholder="e.g. Droplets, Gauge"
                            />
                            {errors.icon && <p className="text-xs text-red-500">{errors.icon}</p>}
                        </div>
                    </div>

                    {/* Usage & Order */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="usage" className="text-sm font-medium">
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

                        <div className="space-y-1.5">
                            <Label htmlFor="order" className="text-sm font-medium">
                                {t('categories_page.order')}
                            </Label>
                            <Input
                                id="order"
                                type="number"
                                min={0}
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                            />
                            {errors.order && <p className="text-xs text-red-500">{errors.order}</p>}
                        </div>
                    </div>

                    {/* Is Active */}
                    <div className="flex items-center gap-2 pt-2">
                        <Checkbox
                            id="is_active"
                            checked={data.is_active}
                            onCheckedChange={(checked) => setData('is_active', Boolean(checked))}
                        />
                        <Label htmlFor="is_active" className="cursor-pointer text-sm font-medium">
                            {t('categories_page.isActive')}
                        </Label>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                            {processing ? t('common.loading') : isEditing ? t('common.update') : t('common.create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

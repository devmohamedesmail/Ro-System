import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ReadingCategory, ReadingParameter, UsageType } from './types';
import { CategoryCard } from './components/CategoryCard';
import { CategoryDialog } from './components/CategoryDialog';
import { ParameterDialog } from './components/ParameterDialog';
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog';
import {
    FolderPlus,
    Search,
    Sliders,
    Layers,
    CheckCircle2,
    Lock,
    Filter,
} from 'lucide-react';
import { toast } from 'sonner';

interface CategoriesPageProps {
    categories: ReadingCategory[];
}

export default function CategoriesPage({ categories = [] }: CategoriesPageProps) {
    const { t } = useTranslation();

    // Dialog state
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ReadingCategory | null>(null);

    const [parameterDialogOpen, setParameterDialogOpen] = useState(false);
    const [selectedParameterCategory, setSelectedParameterCategory] = useState<ReadingCategory | null>(null);
    const [selectedParameter, setSelectedParameter] = useState<ReadingParameter | null>(null);

    // Delete dialog states
    const [deleteCategoryTarget, setDeleteCategoryTarget] = useState<ReadingCategory | null>(null);
    const [deleteParameterTarget, setDeleteParameterTarget] = useState<ReadingParameter | null>(null);
    const [deleting, setDeleting] = useState(false);

    // Filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [usageFilter, setUsageFilter] = useState<string>('ALL');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');

    // Calculated Statistics
    const stats = useMemo(() => {
        const totalCats = categories.length;
        const activeCats = categories.filter((c) => c.is_active).length;
        const systemCats = categories.filter((c) => c.is_system).length;

        let totalParams = 0;
        categories.forEach((cat) => {
            if (cat.parameters) {
                totalParams += cat.parameters.length;
            }
        });

        return { totalCats, activeCats, systemCats, totalParams };
    }, [categories]);

    // Filtered categories
    const filteredCategories = useMemo(() => {
        return categories.filter((cat) => {
            // Usage filter
            if (usageFilter !== 'ALL' && cat.usage !== usageFilter) {
                return false;
            }

            // Status filter
            if (statusFilter === 'ACTIVE' && !cat.is_active) return false;
            if (statusFilter === 'INACTIVE' && cat.is_active) return false;

            // Search query
            if (searchQuery.trim() !== '') {
                const q = searchQuery.toLowerCase();
                const matchCatName = cat.name.toLowerCase().includes(q);
                const matchCatCode = (cat.code || '').toLowerCase().includes(q);
                const matchParam = cat.parameters?.some(
                    (p) => p.name.toLowerCase().includes(q) || (p.code || '').toLowerCase().includes(q)
                );

                return matchCatName || matchCatCode || matchParam;
            }

            return true;
        });
    }, [categories, searchQuery, usageFilter, statusFilter]);

    // Handlers for Category CRUD
    const handleOpenCreateCategory = () => {
        setSelectedCategory(null);
        setCategoryDialogOpen(true);
    };

    const handleOpenEditCategory = (cat: ReadingCategory) => {
        setSelectedCategory(cat);
        setCategoryDialogOpen(true);
    };

    const handleConfirmDeleteCategory = () => {
        if (!deleteCategoryTarget) return;

        setDeleting(true);
        router.delete(`/categories/${deleteCategoryTarget.id}`, {
            onSuccess: () => {
                toast.success(t('categories_page.toastCategoryDeleted'));
                setDeleteCategoryTarget(null);
            },
            onFinish: () => setDeleting(false),
        });
    };

    // Handlers for Parameter CRUD
    const handleOpenAddParameter = (cat: ReadingCategory) => {
        setSelectedParameterCategory(cat);
        setSelectedParameter(null);
        setParameterDialogOpen(true);
    };

    const handleOpenEditParameter = (cat: ReadingCategory, param: ReadingParameter) => {
        setSelectedParameterCategory(cat);
        setSelectedParameter(param);
        setParameterDialogOpen(true);
    };

    const handleConfirmDeleteParameter = () => {
        if (!deleteParameterTarget) return;

        setDeleting(true);
        router.delete(`/categories/parameters/${deleteParameterTarget.id}`, {
            onSuccess: () => {
                toast.success(t('categories_page.toastParameterDeleted'));
                setDeleteParameterTarget(null);
            },
            onFinish: () => setDeleting(false),
        });
    };

    return (
        <DashboardLayout>
            <Head title={`${t('categories_page.title')} — AquaRO`} />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Header Row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 dark:shadow-blue-900/30">
                            <Layers className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {t('categories_page.title')}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {t('categories_page.subtitle')}
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={handleOpenCreateCategory}
                        className="flex items-center gap-2 bg-blue-600 px-5 shadow-sm hover:bg-blue-700"
                    >
                        <FolderPlus className="h-4 w-4" />
                        {t('categories_page.addCategory')}
                    </Button>
                </div>

                {/* KPI Stats Row */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('categories_page.totalCategories')}
                            </p>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                <Layers className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
                            {stats.totalCats}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('categories_page.totalParameters')}
                            </p>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                                <Sliders className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="mt-3 text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                            {stats.totalParams}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('categories_page.activeCategories')}
                            </p>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="mt-3 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                            {stats.activeCats}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('categories_page.systemCategories')}
                            </p>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                                <Lock className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="mt-3 text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                            {stats.systemCats}
                        </p>
                    </div>
                </div>

                {/* Search & Filter Toolbar */}
                <div className="flex flex-col gap-3 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center dark:border-gray-800 dark:bg-gray-900">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 rtl:left-auto rtl:right-3" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('categories_page.searchPlaceholder')}
                            className="pl-9 rtl:pl-3 rtl:pr-9"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-44">
                            <Select value={usageFilter} onValueChange={setUsageFilter}>
                                <SelectTrigger className="flex items-center gap-1.5">
                                    <Filter className="h-3.5 w-3.5 text-gray-400" />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">{t('categories_page.allUsages')}</SelectItem>
                                    <SelectItem value="READING">{t('categories_page.usageReading')}</SelectItem>
                                    <SelectItem value="DAILY_REPORT">{t('categories_page.usageDailyReport')}</SelectItem>
                                    <SelectItem value="BOTH">{t('categories_page.usageBoth')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-40">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">{t('categories_page.allStatuses')}</SelectItem>
                                    <SelectItem value="ACTIVE">{t('categories_page.isActive')}</SelectItem>
                                    <SelectItem value="INACTIVE">{t('common.inactive')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Categories Grid / List */}
                {filteredCategories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center dark:border-gray-800 dark:bg-gray-900">
                        <Layers className="h-12 w-12 text-gray-300 dark:text-gray-700" />
                        <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
                            {categories.length === 0
                                ? t('categories_page.noCategories')
                                : t('categories_page.noCategoriesMatch')}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {categories.length === 0
                                ? t('categories_page.addCategory')
                                : t('common.search')}
                        </p>
                        {categories.length === 0 && (
                            <Button
                                onClick={handleOpenCreateCategory}
                                className="mt-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                            >
                                <FolderPlus className="h-4 w-4" />
                                {t('categories_page.addCategory')}
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredCategories.map((cat) => (
                            <CategoryCard
                                key={cat.id}
                                category={cat}
                                onEditCategory={handleOpenEditCategory}
                                onDeleteCategory={(c) => setDeleteCategoryTarget(c)}
                                onAddParameter={handleOpenAddParameter}
                                onEditParameter={handleOpenEditParameter}
                                onDeleteParameter={(p) => setDeleteParameterTarget(p)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Category Create/Edit Dialog */}
            <CategoryDialog
                open={categoryDialogOpen}
                onClose={() => setCategoryDialogOpen(false)}
                category={selectedCategory}
            />

            {/* Parameter Create/Edit Dialog */}
            {selectedParameterCategory && (
                <ParameterDialog
                    open={parameterDialogOpen}
                    onClose={() => setParameterDialogOpen(false)}
                    category={selectedParameterCategory}
                    parameter={selectedParameter}
                />
            )}

            {/* Category Delete Confirmation */}
            <DeleteConfirmDialog
                open={Boolean(deleteCategoryTarget)}
                onClose={() => setDeleteCategoryTarget(null)}
                title={t('categories_page.confirmDeleteCategoryTitle')}
                message={t('categories_page.confirmDeleteCategoryMessage', {
                    name: deleteCategoryTarget?.name || '',
                })}
                onConfirm={handleConfirmDeleteCategory}
                loading={deleting}
            />

            {/* Parameter Delete Confirmation */}
            <DeleteConfirmDialog
                open={Boolean(deleteParameterTarget)}
                onClose={() => setDeleteParameterTarget(null)}
                title={t('categories_page.confirmDeleteParameterTitle')}
                message={t('categories_page.confirmDeleteParameterMessage', {
                    name: deleteParameterTarget?.name || '',
                })}
                onConfirm={handleConfirmDeleteParameter}
                loading={deleting}
            />
        </DashboardLayout>
    );
}

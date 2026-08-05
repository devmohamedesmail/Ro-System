import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
    BookOpen,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Edit2,
    Hash,
    Plus,
    Settings2,
    Trash2,
    Unplug,
    Zap,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConfirmDeleteDialog } from '@/components/shared/ConfirmDeleteDialog';
import { CategoryFormDialog } from './components/CategoryFormDialog';
import { ParameterFormDialog } from './components/ParameterFormDialog';
import useComapny from '@/hooks/use-comapny';
import { cn } from '@/lib/utils';
import { Category, Parameter, RoUnit } from '@/types/ro';
import useImport from '@/hooks/use-import';


interface PageProps {
    ro_units: RoUnit[];
    categories: Category[];
}

// ─── Input type badge ─────────────────────────────────────────────────────────

const INPUT_TYPE_COLORS = {
    NUMBER: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    TEXT: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    BOOLEAN: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

// ─── Parameter Row ────────────────────────────────────────────────────────────

function ParameterRow({
    param,
    onEdit,
    onDelete,
}: {
    param: Parameter;
    onEdit: (p: Parameter) => void;
    onDelete: (p: Parameter) => void;
}) {
    const { t } = useImport();
    return (
        <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2 dark:border-gray-800 dark:bg-gray-800/30">
            <span className="w-4 text-center text-xs text-gray-400">{param.order}</span>
            <div className="flex flex-1 flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{param.name}</span>
                {param.code && (
                    <span className="flex items-center gap-1 font-mono text-xs text-gray-400">
                        <Hash className="h-3 w-3" /> {param.code}
                    </span>
                )}
                <Badge className={cn('text-xs', INPUT_TYPE_COLORS[param.input_type])}>
                    {t(`ro-settings.inputTypes.${param.input_type}`)}
                </Badge>
                {param.unit && (
                    <span className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        {param.unit}
                    </span>
                )}
                {param.is_required && (
                    <span className="text-xs font-medium text-red-500">*</span>
                )}
                {!param.is_active && (
                    <Badge className="bg-gray-100 text-gray-500 dark:bg-gray-800">
                        {t('common.inactive')}
                    </Badge>
                )}
            </div>
            
            <div className="flex shrink-0 items-center gap-1">
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-gray-400 hover:text-blue-600"
                    onClick={() => onEdit(param)}
                >
                    <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-gray-400 hover:text-red-600"
                    onClick={() => onDelete(param)}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
}

// ─── Assigned Category Card ───────────────────────────────────────────────────

function CategoryCard({
    category,
    roUnitId,
    onEditCategory,
    onDeleteCategory,
}: {
    category: Category;
    roUnitId: number;
    onEditCategory: (c: Category) => void;
    onDeleteCategory: (c: Category) => void;
}) {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(true);
    const [addParamOpen, setAddParamOpen] = useState(false);
    const [editParam, setEditParam] = useState<Parameter | null>(null);
    const [deleteParam, setDeleteParam] = useState<Parameter | null>(null);
    const [deletingParam, setDeletingParam] = useState(false);
    const [unassigning, setUnassigning] = useState(false);

    function handleUnassign() {
        setUnassigning(true);
        router.post(
            `/ro-units/${roUnitId}/unassign-category`,
            { category_id: category.id },
            {
                onSuccess: () => toast.success(t('ro-settings.unassignSuccess')),
                onError: () => toast.error(t('common.error')),
                onFinish: () => setUnassigning(false),
            },
        );
    }

    function handleDeleteParam() {
        if (!deleteParam) return;
        setDeletingParam(true);
        router.delete(`/reading-categories/parameters/${deleteParam.id}`, {
            onSuccess: () => {
                toast.success(t('ro-settings.deleteParameterSuccess'));
                setDeleteParam(null);
            },
            onError: () => toast.error(t('common.error')),
            onFinish: () => setDeletingParam(false),
        });
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3">
                <button
                    type="button"
                    onClick={() => setExpanded((e) => !e)}
                    className="flex flex-1 items-center gap-2 text-left"
                >
                    {expanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {category.name}
                    </span>
                    {category.is_system && (
                        <Badge className="bg-amber-100 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                            System
                        </Badge>
                    )}
                    <span className="ms-auto text-xs text-gray-400">
                        {category.parameters.length} {t('ro-settings.parameters').toLowerCase()}
                    </span>
                </button>

                <div className="flex items-center gap-1">
                    {!category.is_system && (
                        <>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-gray-400 hover:text-blue-600"
                                onClick={() => onEditCategory(category)}
                                title={t('ro-settings.editCategory')}
                            >
                                <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-gray-400 hover:text-red-600"
                                onClick={() => onDeleteCategory(category)}
                                title={t('ro-settings.deleteCategory')}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </>
                    )}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 gap-1 px-2 text-xs text-gray-400 hover:text-orange-600"
                        onClick={handleUnassign}
                        disabled={unassigning}
                        title={t('ro-settings.unassignCategory')}
                    >
                        <Unplug className="h-3.5 w-3.5" />
                        {t('ro-settings.unassignCategory')}
                    </Button>
                </div>
            </div>

            {/* Parameters */}
            {expanded && (
                <div className="border-t border-gray-100 px-4 pb-3 pt-2 dark:border-gray-800">
                    <div className="space-y-1.5">
                        {category.parameters.length === 0 ? (
                            <p className="py-2 text-center text-xs text-gray-400">
                                {t('ro-settings.noParameters')}
                            </p>
                        ) : (
                            category.parameters.map((p) => (
                                <ParameterRow
                                    key={p.id}
                                    param={p}
                                    onEdit={setEditParam}
                                    onDelete={setDeleteParam}
                                />
                            ))
                        )}
                    </div>

                    <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2 gap-1.5 text-xs text-blue-600 hover:text-blue-700"
                        onClick={() => setAddParamOpen(true)}
                    >
                        <Plus className="h-3.5 w-3.5" />
                        {t('ro-settings.addParameter')}
                    </Button>
                </div>
            )}

            {/* Parameter Dialogs */}
            <ParameterFormDialog
                open={addParamOpen}
                onClose={() => setAddParamOpen(false)}
                categoryId={category.id}
            />
            <ParameterFormDialog
                open={!!editParam}
                onClose={() => setEditParam(null)}
                categoryId={category.id}
                parameter={editParam}
            />
            <ConfirmDeleteDialog
                open={!!deleteParam}
                onClose={() => setDeleteParam(null)}
                onConfirm={handleDeleteParam}
                loading={deletingParam}
            />
        </div>
    );
}

// ─── Assign Category Panel ────────────────────────────────────────────────────

function AssignCategoryPanel({
    roUnit,
    allCategories,
}: {
    roUnit: RoUnit;
    allCategories: Category[];
}) {
    const { t } = useTranslation();
    const assignedIds = new Set(roUnit.reading_categories.map((c) => c.id));

    function handleAssign(categoryId: number) {
        router.post(
            `/ro-units/${roUnit.id}/assign-category`,
            { category_id: categoryId },
            {
                onSuccess: () => toast.success(t('ro-settings.assignSuccess')),
                onError: () => toast.error(t('common.error')),
            },
        );
    }

    const unassigned = allCategories.filter((c) => !assignedIds.has(c.id));

    if (unassigned.length === 0) {
        return null;
    }

    return (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {t('ro-settings.allCategories')}
            </p>
            <div className="flex flex-wrap gap-2">
                {unassigned.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleAssign(cat.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RoSettings() {
    const { t } = useTranslation();
    const { ro_units, categories } = usePage().props as any as PageProps;
    const { company } = useComapny();

    const [selectedUnitId, setSelectedUnitId] = useState<number | null>(
        ro_units?.[0]?.id ?? null,
    );

    const [createCatOpen, setCreateCatOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
    const [deletingCat, setDeletingCat] = useState(false);

    const selectedUnit = ro_units?.find((u) => u.id === selectedUnitId) ?? null;

    function handleDeleteCategory() {
        if (!deleteCategory) return;
        setDeletingCat(true);
        router.delete(`/reading-categories/${deleteCategory.id}`, {
            onSuccess: () => {
                toast.success(t('ro-settings.deleteCategorySuccess'));
                setDeleteCategory(null);
            },
            onError: () => toast.error(t('common.error')),
            onFinish: () => setDeletingCat(false),
        });
    }

    return (
        <DashboardLayout>
            <Head title={`${t('ro-settings.title')} — AquaRO`} />

            <div className="flex h-full flex-col gap-0 lg:flex-row">
                {/* ── Left sidebar: RO unit list ── */}
                <aside className="w-full shrink-0 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 lg:w-64 lg:border-b-0 lg:border-e">
                    {/* Header */}
                    <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                            <Settings2 className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                {t('ro-settings.title')}
                            </p>
                            <p className="text-xs text-gray-400">{company?.name}</p>
                        </div>
                    </div>

                    {/* Unit list */}
                    <div className="overflow-y-auto p-2">
                        {ro_units?.map((unit) => (
                            <button
                                key={unit.id}
                                type="button"
                                onClick={() => setSelectedUnitId(unit.id)}
                                className={cn(
                                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition',
                                    selectedUnitId === unit.id
                                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800',
                                )}
                            >
                                <Zap className="h-4 w-4 shrink-0" />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{unit.name}</p>
                                    <p className="font-mono text-xs text-gray-400">{unit.code}</p>
                                </div>
                                {selectedUnitId === unit.id && (
                                    <CheckCircle2 className="ms-auto h-4 w-4 shrink-0 text-blue-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* ── Right panel: categories & parameters ── */}
                <main className="flex-1 overflow-y-auto p-6">
                    {!selectedUnit ? (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-sm text-gray-400">{t('ro-settings.selectUnit')}</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {/* Panel header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-base font-bold text-gray-900 dark:text-white">
                                        {selectedUnit.name}
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        {t('ro-settings.categories')} &bull;{' '}
                                        {selectedUnit.reading_categories.length}{' '}
                                        {t('ro-settings.assigned').toLowerCase()}
                                    </p>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => setCreateCatOpen(true)}
                                    className="gap-1.5"
                                >
                                    <Plus className="h-4 w-4" />
                                    {t('ro-settings.addCategory')}
                                </Button>
                            </div>

                            {/* Assigned category cards */}
                            {selectedUnit.reading_categories.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-12 dark:border-gray-700 dark:bg-gray-900">
                                    <BookOpen className="mb-2 h-8 w-8 text-gray-300" />
                                    <p className="text-sm text-gray-400">
                                        {t('ro-settings.noCategories')}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {selectedUnit.reading_categories.map((cat) => (
                                        <CategoryCard
                                            key={cat.id}
                                            category={cat}
                                            roUnitId={selectedUnit.id}
                                            onEditCategory={setEditCategory}
                                            onDeleteCategory={setDeleteCategory}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Assign from company categories */}
                            <AssignCategoryPanel
                                roUnit={selectedUnit}
                                allCategories={categories ?? []}
                            />
                        </div>
                    )}
                </main>
            </div>

            {/* Dialogs */}
            <CategoryFormDialog
                open={createCatOpen}
                onClose={() => setCreateCatOpen(false)}
            />
            <CategoryFormDialog
                open={!!editCategory}
                onClose={() => setEditCategory(null)}
                category={editCategory}
            />
            <ConfirmDeleteDialog
                open={!!deleteCategory}
                onClose={() => setDeleteCategory(null)}
                onConfirm={handleDeleteCategory}
                loading={deletingCat}
            />
        </DashboardLayout>
    );
}

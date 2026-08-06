import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { ConfirmDeleteDialog } from '@/components/shared/ConfirmDeleteDialog';
import { CategoryFormDialog } from './components/CategoryFormDialog';
import useComapny from '@/hooks/use-comapny';
import { Category, RoUnit } from '@/types/ro';
import CategoryCard from './components/category-card';
import AssignCategoryPanel from './components/assign-category-panel';
import RoSettingSidebar from './components/ro-setting-sidebar';


interface PageProps {
    ro_units: RoUnit[];
    categories: Category[];
    stations: any
}


export default function RoSettings({ stations, categories }: any) {
  
  console.log("stations" ,stations)
  
    const { t } = useTranslation();
    const { company } = useComapny();
    const [createCatOpen, setCreateCatOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
    const [deletingCat, setDeletingCat] = useState(false);

    const [selectedUnitId, setSelectedUnitId] = useState<number | null>(
        stations?.[0]?.ro_units?.[0]?.id ?? null
    );


    const selectedUnit = stations
        ?.flatMap((station: any) => station.ro_units)
        ?.find((unit: any) => unit.id === selectedUnitId) ?? null;

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

                <RoSettingSidebar
                    company={company}
                    stations={stations}
                    setSelectedUnitId={setSelectedUnitId}
                    selectedUnitId={selectedUnitId}
                />

                {/* ── Right panel: categories & parameters ── */}
                <main className="flex-1 overflow-y-auto p-6">
                    {!selectedUnit ? (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-sm text-gray-400">{t('ro-settings.selectUnit')}</p>
                        </div>
                    ) : (
                        <div className="space-y-5">

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


                            {selectedUnit.reading_categories.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-12 dark:border-gray-700 dark:bg-gray-900">
                                    <BookOpen className="mb-2 h-8 w-8 text-gray-300" />
                                    <p className="text-sm text-gray-400">
                                        {t('ro-settings.noCategories')}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {selectedUnit.reading_categories.map((cat:any) => (
                                        <CategoryCard
                                            key={cat.id}
                                            category={cat}
                                            roUnitParameters={selectedUnit.reading_parameters}
                                            roUnitId={selectedUnit.id}
                                            selectedUnit={selectedUnit}
                                            onEditCategory={setEditCategory}
                                            onDeleteCategory={setDeleteCategory}
                                        />

                                    ))}
                                </div>
                            )}


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

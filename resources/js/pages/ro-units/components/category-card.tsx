import { Button } from '@/components/ui/button'
import useImport from '@/hooks/use-import'
import { Category, Parameter } from '@/types/ro';
import { BookOpen, ChevronDown, ChevronRight, Edit2, Plus, Trash2, Unplug } from 'lucide-react'
import React, { useState } from 'react'
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { Badge } from '@/components/ui/badge';
import ParameterRow from './parameter-row';
import { ParameterFormDialog } from './ParameterFormDialog';
import { ConfirmDeleteDialog } from '@/components/shared/ConfirmDeleteDialog';

type Props = {
    category: Category;
    roUnitId: number;
    roUnitParameters: Parameter[];
    onEditCategory: (c: Category) => void;
    onDeleteCategory: (c: Category) => void;
}
// 
export default function CategoryCard({ category, roUnitId, onEditCategory, onDeleteCategory, selectedUnit }: any) {
    const { t } = useImport();
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
            { reading_category_id: category.id },
            
            {
                onSuccess: () => toast.success(t('ro-settings.unassignSuccess')),
                onError: (errors) => {
                    toast.error(t('common.error')),
                    console.log("Error", errors)
                },
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
            {category.pivot.id}
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
                        {category?.name}
                    </span>
                    {category.is_system && (
                        <Badge className="bg-amber-100 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                            System
                        </Badge>
                    )}
                    <span className="ms-auto text-xs text-gray-400">
                        {/* {category.parameters.length} {t('ro-settings.parameters').toLowerCase()} */}
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
                            category.parameters.map((p: Parameter) => (
                                <ParameterRow
                                    key={p.id}
                                    param={p}
                                    category={category}
                                    roUnitId={roUnitId}
                                    selectedUnit={selectedUnit}
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
    )
}

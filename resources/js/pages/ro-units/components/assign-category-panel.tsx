import useImport from '@/hooks/use-import';
import { Category, RoUnit } from '@/types/ro';
import { Head, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AssignCategoryPanel(
    {
        roUnit,
        allCategories,
    }: {
        roUnit: RoUnit;
        allCategories: Category[];
    }
) {
    const { t } = useImport();
    const assignedIds = new Set(roUnit.reading_categories.map((c) => c.id));

    function handleAssign(categoryId: number) {
        router.post(
            `/ro-units/${roUnit.id}/assign-category`,
            { reading_category_id: categoryId },
            {
                onSuccess: () => toast.success(t('ro-settings.assignSuccess')),
                onError: (errors) => {
                    toast.error(t('common.error'))
                    console.log("Error", errors)
                },
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
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 transition hover:border-white hover:bg-primary hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        {cat.name} - {cat.id}
                    </button>
                ))}
            </div>
            
        </div>
  )
}

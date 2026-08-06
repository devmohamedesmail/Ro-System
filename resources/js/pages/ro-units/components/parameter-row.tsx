import useImport from '@/hooks/use-import';
import { cn } from '@/lib/utils';
import { Category, Parameter, RoUnit } from '@/types/ro';
import {
    Edit2,
    Hash,
    Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
export default function ParameterRow({
    param,
    onEdit,
    onDelete,
    roUnitId,
    category,
    selectedUnit
}: {
    param: Parameter;
    onEdit: (p: Parameter) => void;
    onDelete: (p: Parameter) => void;
    roUnitId: number;
    category: any
    selectedUnit: any
}) {
    const { t } = useImport();
    const INPUT_TYPE_COLORS = {
        NUMBER: 'bg-primary text-white dark:bg-primary/30 dark:text-white',
        TEXT: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
        BOOLEAN: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    };


    const handleToggleParameter = (checked: boolean) => {

        router.post(
            `/reading-categories/ro-units/${roUnitId}/toggle-parameter`,
            {
                ro_unit_reading_category_id: category.pivot.id,
                parameter_id: param.id,
                assigned: checked,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        checked
                            ? t('ro-units.parameter-assigned')
                            : t('ro-units.parameter-removed')
                    );
                },
                onError: () => {
                    toast.error('Something went wrong');
                },
            }
        );
    };
    return (
        <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2 dark:border-gray-800 dark:bg-gray-800/30">



            {/* <span className="w-4 text-center text-xs text-gray-400">{param.order}</span> */}
            <div className="flex flex-1 flex-wrap items-center gap-2">

                <Checkbox
                    checked={selectedUnit.reading_parameters.some((item: any) => item.reading_parameter_id === param.id)}
                    onCheckedChange={(checked) =>
                        handleToggleParameter(Boolean(checked))
                    }
                />

                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {param.name}
                </span>
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-2">
                {/* <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{param.name}</span> */}
                {/* {param.code && (
                    <span className="flex items-center gap-1 font-mono text-xs text-gray-400">
                        <Hash className="h-3 w-3" /> {param.code}
                    </span>
                )} */}

                {/* <Checkbox
                    checked={assigned}
                    onCheckedChange={(checked) =>
                        handleToggleParameter(Boolean(checked))
                    }
                /> */}


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
    )
}

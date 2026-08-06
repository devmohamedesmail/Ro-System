import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReadingCategory, ReadingParameter } from '../types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ChevronDown,
    ChevronUp,
    Folder,
    FolderCheck,
    Plus,
    Pencil,
    Trash2,
    Sliders,
    Lock,
    Activity,
    FileText,
    Layers,
    Check,
    X,
} from 'lucide-react';

interface CategoryCardProps {
    category: ReadingCategory;
    onEditCategory: (category: ReadingCategory) => void;
    onDeleteCategory: (category: ReadingCategory) => void;
    onAddParameter: (category: ReadingCategory) => void;
    onEditParameter: (category: ReadingCategory, parameter: ReadingParameter) => void;
    onDeleteParameter: (parameter: ReadingParameter) => void;
}

export function CategoryCard({
    category,
    onEditCategory,
    onDeleteCategory,
    onAddParameter,
    onEditParameter,
    onDeleteParameter,
}: CategoryCardProps) {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(true);

    const parameters = category.parameters || [];

    const getUsageBadge = (usage: string) => {
        switch (usage) {
            case 'READING':
                return (
                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                        <Activity className="mr-1 h-3 w-3" />
                        {t('categories_page.usageReading')}
                    </Badge>
                );
            case 'DAILY_REPORT':
                return (
                    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                        <FileText className="mr-1 h-3 w-3" />
                        {t('categories_page.usageDailyReport')}
                    </Badge>
                );
            case 'BOTH':
                return (
                    <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-300">
                        <Layers className="mr-1 h-3 w-3" />
                        {t('categories_page.usageBoth')}
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getInputTypeBadge = (inputType: string) => {
        switch (inputType) {
            case 'NUMBER':
                return (
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-300">
                        {t('categories_page.inputTypeNumber')}
                    </Badge>
                );
            case 'TEXT':
                return (
                    <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-100 dark:bg-cyan-900/40 dark:text-cyan-300">
                        {t('categories_page.inputTypeText')}
                    </Badge>
                );
            case 'BOOLEAN':
                return (
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-300">
                        {t('categories_page.inputTypeBoolean')}
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white p-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800/80 dark:from-gray-900 dark:to-gray-900">
                <div className="flex items-start gap-3 sm:items-center">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                        {category.is_system ? (
                            <FolderCheck className="h-6 w-6" />
                        ) : (
                            <Folder className="h-6 w-6" />
                        )}
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {category.name}
                            </h3>
                            {category.code && (
                                <code className="rounded bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                    {category.code}
                                </code>
                            )}
                            {category.is_system ? (
                                <Badge variant="secondary" className="gap-1 text-xs">
                                    <Lock className="h-3 w-3" />
                                    {t('categories_page.isSystem')}
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="text-xs">
                                    {t('categories_page.custom')}
                                </Badge>
                            )}
                            {category.is_active ? (
                                <Badge className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                                    {t('categories_page.isActive')}
                                </Badge>
                            ) : (
                                <Badge variant="secondary" className="text-gray-400">
                                    {t('common.inactive')}
                                </Badge>
                            )}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            {getUsageBadge(category.usage)}
                            <span>&bull;</span>
                            <span>{t('categories_page.parametersCount', { count: parameters.length })}</span>
                            <span>&bull;</span>
                            <span>{t('categories_page.order')}: {category.order}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onAddParameter(category)}
                        className="flex items-center gap-1.5 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-950/50"
                    >
                        <Plus className="h-4 w-4" />
                        {t('categories_page.addParameter')}
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEditCategory(category)}
                        title={t('common.edit')}
                        className="h-9 w-9 p-0"
                    >
                        <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>

                    {!category.is_system && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDeleteCategory(category)}
                            title={t('common.delete')}
                            className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    )}

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setExpanded(!expanded)}
                        className="h-9 w-9 p-0"
                    >
                        {expanded ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Parameters Table Body */}
            {expanded && (
                <div className="p-4 sm:p-5">
                    {parameters.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 p-8 text-center dark:border-gray-800">
                            <Sliders className="h-10 w-10 text-gray-300 dark:text-gray-700" />
                            <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                {t('categories_page.noParameters')}
                            </p>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onAddParameter(category)}
                                className="mt-4 flex items-center gap-1.5"
                            >
                                <Plus className="h-4 w-4" />
                                {t('categories_page.addParameter')}
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm dark:text-gray-300">
                                <thead className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:border-gray-800">
                                    <tr>
                                        <th className="pb-3 text-center w-12">#</th>
                                        <th className="pb-3">{t('categories_page.parameterName')}</th>
                                        <th className="pb-3">{t('categories_page.unit')}</th>
                                        <th className="pb-3">{t('categories_page.inputType')}</th>
                                        <th className="pb-3">{t('categories_page.usage')}</th>
                                        <th className="pb-3">{t('categories_page.range')}</th>
                                        <th className="pb-3 text-center">{t('categories_page.trackDifference')}</th>
                                        <th className="pb-3 text-center">{t('categories_page.isRequired')}</th>
                                        <th className="pb-3 text-center">{t('categories_page.isActive')}</th>
                                        <th className="pb-3 text-right">{t('categories_page.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                                    {parameters.map((param) => (
                                        <tr
                                            key={param.id}
                                            className="group transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-800/40"
                                        >
                                            <td className="py-3 text-center text-xs font-mono text-gray-400">
                                                {param.order}
                                            </td>

                                            <td className="py-3 font-medium text-gray-900 dark:text-white">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">{param.name}</span>
                                                    {param.code && (
                                                        <span className="font-mono text-xs text-gray-400">
                                                            {param.code}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="py-3">
                                                {param.unit ? (
                                                    <span className="inline-block rounded bg-gray-100 px-2 py-0.5 font-mono text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                                        {param.unit}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-400">&mdash;</span>
                                                )}
                                            </td>

                                            <td className="py-3">{getInputTypeBadge(param.input_type)}</td>

                                            <td className="py-3">{getUsageBadge(param.usage)}</td>

                                            <td className="py-3 text-xs text-gray-600 dark:text-gray-400">
                                                {param.min_value !== null || param.max_value !== null ? (
                                                    <span className="font-mono">
                                                        {param.min_value ?? '&infin;'} &rarr; {param.max_value ?? '&infin;'}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">&mdash;</span>
                                                )}
                                            </td>

                                            <td className="py-3 text-center">
                                                {param.track_difference ? (
                                                    <Check className="mx-auto h-4 w-4 text-emerald-500" />
                                                ) : (
                                                    <X className="mx-auto h-4 w-4 text-gray-300 dark:text-gray-600" />
                                                )}
                                            </td>

                                            <td className="py-3 text-center">
                                                {param.is_required ? (
                                                    <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                                                        {t('categories_page.yes')}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-xs text-gray-400">{t('categories_page.no')}</span>
                                                )}
                                            </td>

                                            <td className="py-3 text-center">
                                                {param.is_active ? (
                                                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400/50" />
                                                ) : (
                                                    <span className="inline-flex h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                                                )}
                                            </td>

                                            <td className="py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => onEditParameter(category, param)}
                                                        title={t('common.edit')}
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5 text-gray-500 hover:text-blue-600" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => onDeleteParameter(param)}
                                                        title={t('common.delete')}
                                                        className="h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-950/30"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

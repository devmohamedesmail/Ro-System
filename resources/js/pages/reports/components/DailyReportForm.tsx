import { useFormik } from 'formik'
import * as Yup from 'yup'
import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    FileText,
    NotepadTextDashed,
    CalendarDays,
    Lightbulb,
    ClipboardList,
    ChevronRight,
    CheckCircle2,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Parameter {
    id: number
    name: string
    code: string
    unit: string | null
    track_difference: boolean
    is_required: boolean
}

interface Category {
    id: number
    name: string
    parameters: Parameter[]
}

interface RoUnit {
    id: number
    name: string
    code: string
    reading_categories: Category[]
}

interface DailyReportFormProps {
    unit: RoUnit
    t: (key: string, fallback?: string) => string
}

export function DailyReportForm({ unit, t }: DailyReportFormProps) {
    // Build initial values: for each parameter, prev + current; difference is computed
    const initialValues: Record<string, string> = {}
    unit.reading_categories?.forEach((category) => {
        category.parameters?.forEach((param) => {
            initialValues[`prev_${param.id}`] = ''
            initialValues[`curr_${param.id}`] = ''
        })
    })

    // Build Yup shape dynamically
    const schemaShape: Record<string, Yup.StringSchema | Yup.DateSchema> = {
        report_date: Yup.string().required(t('reports.validation.dateRequired', 'Report date is required')),
        actions: Yup.string().nullable(),
        recommendations: Yup.string().nullable(),
    }
    unit.reading_categories?.forEach((category) => {
        category.parameters?.forEach((param) => {
            const currKey = `curr_${param.id}`
            const prevKey = `prev_${param.id}`
            if (param.is_required) {
                schemaShape[currKey] = Yup.string()
                    .required(t('reports.validation.required', 'This field is required'))
                    .matches(/^-?\d*\.?\d*$/, t('reports.validation.numeric', 'Must be a number'))
            } else {
                schemaShape[currKey] = Yup.string()
                    .nullable()
                    .matches(/^-?\d*\.?\d*$/, t('reports.validation.numeric', 'Must be a number'))
            }
            schemaShape[prevKey] = Yup.string()
                .nullable()
                .matches(/^-?\d*\.?\d*$/, t('reports.validation.numeric', 'Must be a number'))
        })
    })

    const validationSchema = Yup.object(schemaShape)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ro_unit_id: unit.id,
            report_date: new Date().toISOString().split('T')[0],
            actions: '',
            recommendations: '',
            ...initialValues,
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm, setErrors }) => {
            // Build values array for backend
            const paramValues: Record<string, { previous_value: string | null; current_value: string | null; difference: string | null }> = {}

            unit.reading_categories?.forEach((category) => {
                category.parameters?.forEach((param) => {
                    const prev = values[`prev_${param.id}`] as string
                    const curr = values[`curr_${param.id}`] as string
                    const prevNum = parseFloat(prev)
                    const currNum = parseFloat(curr)
                    const diff = !isNaN(prevNum) && !isNaN(currNum) ? String((currNum - prevNum).toFixed(3)) : null

                    paramValues[param.id] = {
                        previous_value: prev || null,
                        current_value: curr || null,
                        difference: diff,
                    }
                })
            })

            const payload = {
                ro_unit_id: values.ro_unit_id,
                report_date: values.report_date,
                actions: values.actions || null,
                recommendations: values.recommendations || null,
                values: paramValues,
            }

            router.post('/reports', payload, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(t('common.saved', 'Saved Successfully'))
                    resetForm()
                },
                onError: (errors) => {
                    toast.error(t('common.error', 'An error occurred'))
                    setErrors(errors as any)
                },
                onFinish: () => setSubmitting(false),
            })
        },
    })

    const getTodayDate = () => new Date().toISOString().split('T')[0]

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md"
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-teal-600" />
                    {unit.name}
                    {unit.code && (
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                            {unit.code}
                        </span>
                    )}
                </h2>
            </div>

            {/* Report Date */}
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-100 dark:border-teal-800/40">
                <div className="flex items-center gap-2 mb-3">
                    <CalendarDays className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    <h3 className="font-semibold text-teal-800 dark:text-teal-300 text-sm uppercase tracking-wide">
                        {t('reports.reportDate', 'Report Date / تاريخ التقرير')}
                    </h3>
                </div>
                <div className="max-w-xs">
                    <Input
                        id={`report_date_${unit.id}`}
                        name="report_date"
                        type="date"
                        max={getTodayDate()}
                        value={formik.values.report_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-900/50 bg-white"
                    />
                    {formik.touched.report_date && formik.errors.report_date && (
                        <p className="text-xs text-red-500 mt-1">{formik.errors.report_date as string}</p>
                    )}
                </div>
            </div>

            {/* Reading Categories */}
            <div className="space-y-5">
                {unit.reading_categories?.map((category) => (
                    <div
                        key={category.id}
                        className="rounded-xl border border-gray-200 dark:border-gray-700/60 overflow-hidden bg-gray-50/50 dark:bg-gray-800/30"
                    >
                        <div className="bg-gray-100/80 dark:bg-gray-800 px-5 py-3 border-b border-gray-200 dark:border-gray-700/60">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{category.name}</h3>
                        </div>

                        <div className="p-5">
                            {!category.parameters || category.parameters.length === 0 ? (
                                <div className="flex items-center justify-center flex-col py-6 opacity-60">
                                    <NotepadTextDashed size={32} className="text-gray-400 mb-3" />
                                    <span className="text-sm text-gray-500 font-medium">
                                        {t('readings.no-parameters', 'No parameters found in this category')}
                                    </span>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Column headers */}
                                    <div className="grid grid-cols-12 gap-3 pb-1 border-b border-gray-200 dark:border-gray-700/40">
                                        <div className="col-span-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            {t('reports.parameter', 'Parameter / المعامل')}
                                        </div>
                                        <div className="col-span-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center">
                                            {t('reports.previousValue', 'Previous / السابق')}
                                        </div>
                                        <div className="col-span-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center">
                                            {t('reports.currentValue', 'Current / الحالي')}
                                        </div>
                                        <div className="col-span-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center">
                                            {t('reports.difference', 'Diff / الفرق')}
                                        </div>
                                    </div>

                                    {/* Parameter rows */}
                                    {category.parameters.map((param) => {
                                        const prevKey = `prev_${param.id}`
                                        const currKey = `curr_${param.id}`
                                        const prevVal = formik.values[prevKey] as string
                                        const currVal = formik.values[currKey] as string
                                        const prevNum = parseFloat(prevVal)
                                        const currNum = parseFloat(currVal)
                                        const diff =
                                            !isNaN(prevNum) && !isNaN(currNum)
                                                ? (currNum - prevNum).toFixed(2)
                                                : '—'
                                        const diffNum = parseFloat(diff)
                                        const isDiffPositive = diffNum > 0
                                        const isDiffNegative = diffNum < 0

                                        const currError =
                                            formik.touched[currKey] && formik.errors[currKey]
                                        const prevError =
                                            formik.touched[prevKey] && formik.errors[prevKey]

                                        return (
                                            <div key={param.id} className="grid grid-cols-12 gap-3 items-start">
                                                {/* Parameter name */}
                                                <div className="col-span-4 flex items-start gap-2 pt-2">
                                                    <ChevronRight className="h-3 w-3 text-teal-500 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            {param.name}
                                                        </span>
                                                        {param.is_required && (
                                                            <span className="ms-1 text-red-400 text-xs">*</span>
                                                        )}
                                                        {param.unit && (
                                                            <span className="block text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-medium w-fit mt-0.5">
                                                                {param.unit}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Previous value */}
                                                <div className="col-span-3">
                                                    <Input
                                                        id={`prev_${param.id}_${unit.id}`}
                                                        name={prevKey}
                                                        type="number"
                                                        step="0.001"
                                                        value={prevVal ?? ''}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="0.00"
                                                        className="text-center focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-900/50 transition-all"
                                                    />
                                                    {prevError && (
                                                        <p className="text-xs text-red-500 mt-1">
                                                            {formik.errors[prevKey] as string}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Current value */}
                                                <div className="col-span-3">
                                                    <Input
                                                        id={`curr_${param.id}_${unit.id}`}
                                                        name={currKey}
                                                        type="number"
                                                        step="0.001"
                                                        value={currVal ?? ''}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="0.00"
                                                        className="text-center focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-900/50 transition-all"
                                                    />
                                                    {currError && (
                                                        <p className="text-xs text-red-500 mt-1">
                                                            {formik.errors[currKey] as string}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Difference (auto-calculated) */}
                                                <div className="col-span-2 flex items-center justify-center pt-2">
                                                    <span
                                                        className={`text-sm font-semibold tabular-nums px-2 py-0.5 rounded-md ${
                                                            diff === '—'
                                                                ? 'text-gray-400 dark:text-gray-600'
                                                                : isDiffPositive
                                                                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                                                                  : isDiffNegative
                                                                    ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                                                                    : 'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800'
                                                        }`}
                                                    >
                                                        {diff === '—' ? '—' : isDiffPositive ? `+${diff}` : diff}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions & Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="space-y-2">
                    <Label
                        htmlFor={`actions_${unit.id}`}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
                    >
                        <ClipboardList className="h-4 w-4 text-teal-500" />
                        {t('reports.actions', 'Actions Taken / الإجراءات المتخذة')}
                    </Label>
                    <Textarea
                        id={`actions_${unit.id}`}
                        name="actions"
                        value={formik.values.actions}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t('reports.actionsPlaceholder', 'Describe any actions taken today...')}
                        rows={3}
                        className="resize-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-900/50"
                    />
                    {formik.touched.actions && formik.errors.actions && (
                        <p className="text-xs text-red-500 mt-1">{formik.errors.actions as string}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor={`recommendations_${unit.id}`}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
                    >
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        {t('reports.recommendations', 'Recommendations / التوصيات')}
                    </Label>
                    <Textarea
                        id={`recommendations_${unit.id}`}
                        name="recommendations"
                        value={formik.values.recommendations}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t('reports.recommendationsPlaceholder', 'Add any recommendations or notes...')}
                        rows={3}
                        className="resize-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-900/50"
                    />
                    {formik.touched.recommendations && formik.errors.recommendations && (
                        <p className="text-xs text-red-500 mt-1">
                            {formik.errors.recommendations as string}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-400 dark:text-gray-600">
                    {t('reports.submittedFor', 'Submitting report for')}: <strong>{unit.name}</strong>
                </p>
                <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="min-w-40 bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-200 dark:shadow-teal-900/20 flex items-center gap-2"
                >
                    <CheckCircle2 className="h-4 w-4" />
                    {formik.isSubmitting
                        ? t('common.saving', 'Saving...')
                        : t('reports.submit', 'Submit Report / إرسال التقرير')}
                </Button>
            </div>
        </form>
    )
}

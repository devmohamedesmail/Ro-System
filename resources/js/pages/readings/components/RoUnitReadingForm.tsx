import { useFormik } from 'formik'
import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { NotepadTextDashed } from 'lucide-react'
import toast from 'react-hot-toast'

export function RoUnitReadingForm({ unit, t }: { unit: any, t: any }) {
    // Collect all parameters to initialize form
    const initialValues: Record<string, string> = {}
    unit.reading_categories?.forEach((category: any) => {
        category.parameters?.forEach((param: any) => {
            initialValues[param.id] = ''
        })
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ro_unit_id: unit.id,
            notes: '',
            values: initialValues
        },
        onSubmit: (values, { setSubmitting, resetForm, setErrors }) => {  
            router.post('/readings', values, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(t('readings.reading_added'));
                    resetForm();
                },
                onError: (errors: any) => {
                    toast.error(t('common.error'));
                    setErrors(errors);
                },
                onFinish: () => setSubmitting(false),
            });
            
        },
    });

    const readingAtError = (formik.errors as any).reading_at as string | undefined;

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2'>
                    {unit.name}
                    {unit.code && (
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                            {unit.code}
                        </span>
                    )}
                </h2>
            </div>
            
            <div className="space-y-6">
                {unit.ro_unit_reading_categories?.map((category: any) => (
                    <div key={category.id} className='rounded-xl border border-gray-200 dark:border-gray-700/60 overflow-hidden bg-gray-50/50 dark:bg-gray-800/30'>
                        <div className='bg-gray-100/80 dark:bg-gray-800 px-5 py-3 border-b border-gray-200 dark:border-gray-700/60'>
                            <h3 className='font-semibold text-gray-800 dark:text-gray-200'>{category.name}</h3>
                        </div>

                        <div className="p-5">
                            {!category.parameters || category.parameters.length === 0 ? (
                                <div className='flex items-center justify-center flex-col py-6 opacity-60'>
                                    <NotepadTextDashed size={32} className='text-gray-400 mb-3' />
                                    <span className='text-sm text-gray-500 font-medium'>
                                        {t("readings.no-parameters", "No parameters found in this category")}
                                    </span>
                                </div>
                            ) : (
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                    {category.parameters.map((parameter: any) => {
                                        // Need to extract specific errors for 'values.id'
                                        const errorKey = `values.${parameter.id}`;
                                        // @ts-ignore
                                        const errorMsg = formik.errors[errorKey] || (formik.errors.values && (formik.errors.values as any)[parameter.id]);

                                        return (
                                            <div key={parameter.id} className="space-y-2 relative group">
                                                <Label htmlFor={`param-${parameter.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                                                    <span>{parameter.name}</span>
                                                    {parameter.unit && <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-medium">{parameter.unit}</span>}
                                                </Label>
                                                <Input 
                                                    id={`param-${parameter.id}`}
                                                    name={`values.${parameter.id}`}
                                                    type="number"
                                                    step="0.001"
                                                    value={formik.values.values[parameter.id] ?? ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-900/50 transition-all"
                                                    placeholder={t('common.value')}
                                                />
                                                {errorMsg && (
                                                    <p className="text-xs text-red-500 mt-1 absolute -bottom-5">{errorMsg as string}</p>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-2 pt-4">
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('common.notes')}</Label>
                <Textarea 
                    id="notes"
                    name="notes"
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t('readings.notes_placeholder')}
                    rows={2}
                    className="resize-none focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-900/50"
                />
                {formik.errors.notes && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.notes as string}</p>
                )}
                {/* Global 'reading_at' error from controller logic (like 3-hour rule violation) */}
                {readingAtError && (
                    <p className="text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/50 mt-4">
                        {readingAtError}
                    </p>
                )}
            </div>

            <div className="flex justify-end pt-2">
                <Button type='submit' disabled={formik.isSubmitting} className="min-w-32 ">
                    {formik.isSubmitting ? t('common.saving', 'Saving...') : t("common.save", 'Save Readings')}
                </Button>
            </div>
        </form>
    )
}


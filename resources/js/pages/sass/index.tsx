import React from 'react'
import { DashboardLayout } from '../dashboard/components/DashboardLayout'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useTranslation } from 'react-i18next'
import { router } from '@inertiajs/react'
import ImagePicker from '@/components/ui/image-picker'
import toast from 'react-hot-toast'


interface Setting {
    id: number
    app_name_en: string
    app_name_ar: string
    company_name: string
    email: string
    phone: string
    address: string
    app_logo: string | null
    app_logo_dark: string | null
    primary_color: string
    secondary_color: string
    footer_text: string
    meta_title: string
    meta_description: string
    meta_keywords: string
}


interface Props {
    settings: Setting
}


export default function Index({ settings }: Props) {

    const { t } = useTranslation()


    const formik = useFormik({

        initialValues: {

            app_name_en: settings.app_name_en ?? '',
            app_name_ar: settings.app_name_ar ?? '',
            company_name: settings.company_name ?? '',

            email: settings.email ?? '',
            phone: settings.phone ?? '',
            address: settings.address ?? '',

            app_logo: null as File | null,
            app_logo_dark: null as File | null,

            primary_color: settings.primary_color ?? '#2563eb',
            secondary_color: settings.secondary_color ?? '#0f172a',

            footer_text: settings.footer_text ?? '',

            meta_title: settings.meta_title ?? '',
            meta_description: settings.meta_description ?? '',
            meta_keywords: settings.meta_keywords ?? '',

        },


        validationSchema: Yup.object({

            app_name_en:
                Yup.string()
                .required(t('validation.required')),

            app_name_ar:
                Yup.string()
                .required(t('validation.required')),

            company_name:
                Yup.string()
                .required(t('validation.required')),

            email:
                Yup.string()
                .email(t('validation.email')),

        }),


        onSubmit(values){

            const formData = new FormData()


            Object.entries(values).forEach(([key,value])=>{

                if(value){
                    formData.append(
                        key,
                        value as any
                    )
                }

            })


            router.post('/sass-update/confirm',
                formData,
                {
                    forceFormData:true,
                    onSuccess:()=>{
                        toast.success(t('settings.updated'))
                        formik.resetForm()
                    },
                    onError:(errors)=>{
                        toast.error(t('settings.error'))
                    }
                }
            )

        }

    })


    return (

        <DashboardLayout>


            <div className="p-6 space-y-6">


                <h1 className="text-2xl font-bold">
                    {t('settings.title')}
                </h1>



                <form
                    onSubmit={formik.handleSubmit}
                    className="
                    grid gap-6 
                    bg-white 
                    dark:bg-slate-900 
                    p-6 
                    rounded-xl
                    "
                >



                    <div className="grid md:grid-cols-2 gap-4">


                        <div>

                            <Label>
                                {t('settings.app-name-en')}
                            </Label>


                            <Input
                                name="app_name_en"
                                value={formik.values.app_name_en}
                                onChange={formik.handleChange}
                            />


                        </div>



                        <div>

                            <Label>
                                {t('settings.app-name-ar')}
                            </Label>


                            <Input
                                name="app_name_ar"
                                value={formik.values.app_name_ar}
                                onChange={formik.handleChange}
                            />


                        </div>




                        <div>

                            <Label>
                                {t('settings.company-name')}
                            </Label>


                            <Input
                                name="company_name"
                                value={formik.values.company_name}
                                onChange={formik.handleChange}
                            />

                        </div>



                        <div>

                            <Label>
                                {t('settings.email')}
                            </Label>


                            <Input
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />


                        </div>



                        <div>

                            <Label>
                                {t('settings.phone')}
                            </Label>


                            <Input
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            />


                        </div>



                        <div>

                            <Label>
                                {t('settings.address')}
                            </Label>


                            <Input
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />


                        </div>


                    </div>




                    <div className="grid md:grid-cols-2 gap-5">


                        <ImagePicker

                            id="logo"

                            label={t('settings.app-logo')}

                            initialPreview={
                                settings.app_logo
                            }

                            onChange={(file)=>
                                formik.setFieldValue(
                                    'app_logo',
                                    file
                                )
                            }

                        />



                        <ImagePicker

                            id="logo-dark"

                            label={
                                t('settings.app-logo-dark')
                            }

                            initialPreview={
                                settings.app_logo_dark
                            }

                            onChange={(file)=>
                                formik.setFieldValue(
                                    'app_logo_dark',
                                    file
                                )
                            }

                        />


                    </div>




                    <div className="grid md:grid-cols-2 gap-4">


                        <div>

                            <Label>
                                {t('settings.primary-color')}
                            </Label>


                            <Input

                                type="color"

                                name="primary_color"

                                value={
                                    formik.values.primary_color
                                }

                                onChange={
                                    formik.handleChange
                                }

                            />


                        </div>



                        <div>

                            <Label>
                                {t('settings.secondary-color')}
                            </Label>


                            <Input

                                type="color"

                                name="secondary_color"

                                value={
                                    formik.values.secondary_color
                                }

                                onChange={
                                    formik.handleChange
                                }

                            />

                        </div>


                    </div>




                    <div>

                        <Label>
                            {t('settings.footer-text')}
                        </Label>


                        <Input

                            name="footer_text"

                            value={
                                formik.values.footer_text
                            }

                            onChange={
                                formik.handleChange
                            }

                        />

                    </div>



                    <div>

                        <Label>
                            {t('settings.meta-title')}
                        </Label>


                        <Input

                            name="meta_title"

                            value={
                                formik.values.meta_title
                            }

                            onChange={
                                formik.handleChange
                            }

                        />

                    </div>




                    <div>

                        <Label>
                            {t('settings.meta-description')}
                        </Label>


                        <Input

                            name="meta_description"

                            value={
                                formik.values.meta_description
                            }

                            onChange={
                                formik.handleChange
                            }

                        />

                    </div>



                    <div>

                        <Label>
                            {t('settings.meta-keywords')}
                        </Label>


                        <Input

                            name="meta_keywords"

                            value={
                                formik.values.meta_keywords
                            }

                            onChange={
                                formik.handleChange
                            }

                        />

                    </div>




                    <Button
                        type="submit"
                        disabled={
                            formik.isSubmitting
                        }
                        className="w-fit"
                    >

                        {
                            formik.isSubmitting
                            ?
                            t('common.saving')
                            :
                            t('common.save')
                        }

                    </Button>



                </form>


            </div>


        </DashboardLayout>

    )
}
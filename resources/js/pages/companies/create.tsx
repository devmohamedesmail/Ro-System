import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImagePicker from "@/components/ui/image-picker";
import { Textarea } from "@/components/ui/textarea";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import useImport from "@/hooks/use-import";
import InputError from "@/components/input-error";
import PublicLayout from "@/layouts/public_layout";


export default function Create() {
  const { t } = useImport();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      website: "",
      country: "",
      city: "",
      address: "",
      description: "",
      logo: null as File | null,
    },

    validationSchema: Yup.object({
      name: Yup.string().required(t('validation.required')),
      email: Yup.string().email(t('validation.invalid-email')).required(t('validation.required')),
      phone: Yup.string(),
      whatsapp: Yup.string(),
      website: Yup.string().url(t('validation.invalid-url')),
      country: Yup.string(),
      city: Yup.string(),
      address: Yup.string(),
      description: Yup.string(),
      logo: Yup.mixed()
        .nullable()
        .test(
          "fileSize",
          "Image size must be less than 2MB",
          (file) =>
            !file || file.size <= 2 * 1024 * 1024
        )
        .test(
          "fileType",
          "Only images are allowed",
          (file) =>
            !file ||
            [
              "image/jpeg",
              "image/png",
              "image/webp",
            ].includes(file.type)
        ),
    }),

    onSubmit: (values) => {
      console.log(values)
      router.post('/companies/store', values, {
        forceFormData: true,

        onSuccess: () => {
          toast.success(t('common.success'));
        },

        onError: (error) => {
          toast.error(t('common.error'));
          console.log(error)
        },

        onFinish: () => {
          formik.setSubmitting(false);
        }
      });

    },
  });


  return (
  <PublicLayout>
      <div className="max-w-5xl mx-auto p-6">

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6"
      >

        <div className="grid md:grid-cols-2 gap-5">

          {/* Logo */}
          <div className="md:col-span-2">
            <ImagePicker
              id="logo"
              label={t('companies.company_logo')}
              onChange={(file) =>
                formik.setFieldValue("logo", file)
              }
              error={
                formik.touched.logo
                  ? (formik.errors.logo as string)
                  : undefined
              }
            />
          </div>


          <div>
            <Label>{t('companies.company_name')}</Label>
            <Input name="name" onChange={formik.handleChange} value={formik.values.name} />
             <InputError message={formik.errors.name} />
          </div>




          <div>
            <Label>{t('companies.company_email')}</Label>
            <Input name="email" onChange={formik.handleChange} value={formik.values.email} />
             <InputError message={formik.errors.email} />
          </div>


        

           <div>
            <Label>{t('companies.company_phone')}</Label>
            <Input name="phone" onChange={formik.handleChange} value={formik.values.phone} />
             <InputError message={formik.errors.phone} />
          </div>

           <div>
            <Label>{t('companies.company_whatsapp')}</Label>
            <Input name="whatsapp" onChange={formik.handleChange} value={formik.values.whatsapp} />
             <InputError message={formik.errors.whatsapp} />
          </div>

           <div>
            <Label>{t('companies.company_website')}</Label>
            <Input name="website" onChange={formik.handleChange} value={formik.values.website} />
             <InputError message={formik.errors.website} />
          </div>


           <div>
            <Label>{t('companies.country')}</Label>
            <Input name="country" onChange={formik.handleChange} value={formik.values.country} />
             <InputError message={formik.errors.country} />
          </div>


           <div>
            <Label>{t('companies.city')}</Label>
            <Input name="city" onChange={formik.handleChange} value={formik.values.city} />
             <InputError message={formik.errors.city} />
          </div>


    
        </div>


        {/* Address */}
        <div>
          <Label>{t('companies.address')}</Label>

          <Textarea
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <InputError message={formik.errors.address} />
        </div>


        {/* Description */}
        <div>
          <Label>{t('companies.description')}</Label>

          <Textarea
            rows={5}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

         
          <InputError message={formik.errors.description} />
        </div>



        <Button
          type="submit"
          disabled={formik.isSubmitting}

        >
          {t('common.create')}
        </Button>


      </form>

    </div>
  </PublicLayout>
  );
}




import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useImport from '@/hooks/use-import';
import { Eye } from 'lucide-react';

interface Role {
    id: number;
    name: string;
}

interface Station {
    id: number;
    name: string;
    code: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role_id?: number;
    stations?: { id: number }[];
}

interface UserFormDialogProps {
    open: boolean;
    onClose: () => void;
    stations: Station[];
    roles: Role[];
    user?: User | null;
}

export function UserFormDialog({ open, onClose, stations, user, roles }: UserFormDialogProps) {
    const { t } = useImport();
    const [showPassword, setShowPassword] = useState(false)
    const isEdit = !!user;
   

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: user?.name ?? '',
            email: user?.email ?? '',
            password: '',
            role_id: user?.role_id?.toString() ?? '',
            station_ids: user?.stations?.map((s) => s.id) ?? [],
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('validation.required')),
            email: Yup.string()
                .required(t('validation.required'))
                .email(t('validation.email')),
            password: isEdit
                ? Yup.string().min(8, t('validation.min', { min: 8 })).nullable()
                : Yup.string()
                    .required(t('validation.required'))
                    .min(8, t('validation.min', { min: 8 })),
            role_id: Yup.string().required(t('validation.required')),
            station_ids: Yup.array().of(Yup.number()),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            const payload = {
                ...values,
                role_id: Number(values.role_id),
            };
            if (isEdit) {
                router.put(`/users/${user!.id}`, payload, {
                    onSuccess: () => {
                        toast.success(t('users.updateSuccess'));
                        resetForm();
                        onClose();
                    },
                    onError: () => toast.error(t('common.error')),
                    onFinish: () => setSubmitting(false),
                });
            } else {
                router.post('/users/store', payload, {
                    onSuccess: () => {
                        toast.success(t('users.createSuccess'));
                        resetForm();
                        onClose();
                    },
                    onError: () => toast.error(t('common.error')),
                    onFinish: () => setSubmitting(false),
                });
            }
        },
    });

    function toggleStation(id: number) {
        const current = formik.values.station_ids;
        const next = current.includes(id) ? current.filter((s) => s !== id) : [...current, id];
        formik.setFieldValue('station_ids', next);
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? t('users.edit') : t('users.create')}
                    </DialogTitle>
                </DialogHeader>
             

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <Label>{t('users.fields.name')}</Label>
                        <Input
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <InputError message={formik.touched.name ? formik.errors.name : undefined} />
                    </div>

                    <div className="space-y-1">
                        <Label>{t('users.fields.email')}</Label>
                        <Input
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <InputError message={formik.touched.email ? formik.errors.email : undefined} />
                    </div>

                    <div className="space-y-1">
                        <Label>
                            {t('users.fields.password')}
                            {isEdit && (
                                <span className="ms-1 text-xs text-gray-400">
                                    ({t('common.loading').replace('...', '')} — {t('common.cancel').toLowerCase()} {t('common.of')} {t('common.noData').toLowerCase()})
                                </span>
                            )}
                        </Label>
                        <div className='flex items-center'>
                           
                            <Input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                // type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={isEdit ? '••••••••' : ''}
                            />
                             <button className='bg-primary flex items-center justify-center rounded-md h-11 w-11 ' onClick={() => setShowPassword(!showPassword)}>
                                <Eye className='text-white' />
                            </button>
                        </div>
                        <InputError message={formik.touched.password ? formik.errors.password : undefined} />
                    </div>

                    {/* Station Assignment */}
                    {stations.length > 0 && (
                        <div className="space-y-2">
                            <Label>{t('users.fields.stations')}</Label>
                            <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-200 p-3 dark:border-gray-800">
                                <div className="space-y-2">
                                    {stations.map((station) => (
                                        <label
                                            key={station.id}
                                            className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <Checkbox
                                                checked={formik.values.station_ids.includes(station.id)}
                                                onCheckedChange={() => toggleStation(station.id)}
                                                id={`station-${station.id}`}
                                            />
                                            <span className="flex-1 text-gray-700 dark:text-gray-300">
                                                {station.name}
                                            </span>
                                            <span className="font-mono text-xs text-gray-400">
                                                {station.code}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}


                    <div className="space-y-1">
                        <Label>{t('users.fields.role')}</Label>

                        <Select
                            value={formik.values.role_id}
                            onValueChange={(value) => formik.setFieldValue('role_id', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t('users.fields.selectRole')} />
                            </SelectTrigger>

                            <SelectContent>
                                {roles?.map((role) => (
                                    <SelectItem
                                        key={role.id}
                                        value={role.id.toString()}
                                    >
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError
                            message={
                                formik.touched.role_id
                                    ? (formik.errors.role_id as string)
                                    : undefined
                            }
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? t('common.loading') : t('common.save')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

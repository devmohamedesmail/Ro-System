import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Plus, Users } from 'lucide-react';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { UserTable } from './components/UserTable';
import { UserFormDialog } from './components/UserFormDialog';
import useComapny from '@/hooks/use-comapny';


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
    stations?: Station[];
      role:{
        id:number,
        name:string
    }
}

interface PageProps {
    users: User[];
    roles: Role[];
    stations: Station[];
}

export default function CompanyUsersPage() {
    const { t } = useTranslation();
    const { users, stations, roles } = usePage().props as any as PageProps;
    
    const { company } = useComapny();
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <DashboardLayout>
            <Head title={`${t('users.title')} — AquaRO`} />

            <div className="space-y-6 p-6">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-md shadow-violet-200 dark:shadow-violet-900/30">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                {t('users.title')}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {company?.name} &mdash; {t('users.subtitle')}
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={() => setCreateOpen(true)}
                        className="flex items-center gap-2 shadow-sm"
                    >
                        <Plus className="h-4 w-4" />
                        {t('users.create')}
                    </Button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {t('common.total')}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {users?.length ?? 0}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('users.title')}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {t('stations.title')}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {stations?.length ?? 0}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('stations.subtitle')}</p>
                    </div>
                </div>

                {/* Table */}
                <UserTable users={users ?? []} stations={stations ?? []} roles={roles} />
            </div>

            {/* Create Dialog */}
            <UserFormDialog
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                stations={stations ?? []}
                roles={roles ?? []}
            />
        </DashboardLayout>
    );
}

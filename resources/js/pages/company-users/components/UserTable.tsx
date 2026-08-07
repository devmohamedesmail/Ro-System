import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { AppWindowMac, Edit2, Mail, Trash2, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ConfirmDeleteDialog } from '@/components/shared/ConfirmDeleteDialog';
import { UserFormDialog } from './UserFormDialog';

interface Station {
    id: number;
    name: string;
    code: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    stations?: Station[];
    role:{
        id:number,
        name:string
    }
}

interface UserTableProps {
    users: User[];
    stations: Station[];
    roles:any
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export function UserTable({ users, stations,roles }: UserTableProps) {
    const { t } = useTranslation();
    const [editUser, setEditUser] = useState<User | null>(null);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);
    const [deleting, setDeleting] = useState(false);

    function handleDelete() {
        if (!deleteUser) return;
        setDeleting(true);
        router.delete(`/users/${deleteUser.id}`, {
            onSuccess: () => {
                toast.success(t('users.deleteSuccess'));
                setDeleteUser(null);
            },
            onError: () => toast.error(t('common.error')),
            onFinish: () => setDeleting(false),
        });
    }

    if (users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 dark:border-gray-700 dark:bg-gray-900">
                <Users className="mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('users.noUsers')}</p>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('users.table.name')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('users.table.email')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('users.table.role')}
                            </th>
                            <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('users.table.stations')}
                            </th>
                            <th className="px-6 py-3 text-end text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {t('users.table.actions')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-800/40"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="bg-violet-100 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                                                {getInitials(user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                                        <Mail className="h-3.5 w-3.5 shrink-0" />
                                        {user.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                                        
                                       <User className="h-3.5 w-3.5 shrink-0" />
                                        {user?.role?.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {user.stations && user.stations.length > 0 ? (
                                            user.stations.map((s) => (
                                                <Badge
                                                    key={s.id}
                                                    className="bg-primary text-white dark:bg-blue-900/30 dark:text-blue-400"
                                                >
                                                    {s.name}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-xs text-gray-400">—</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                                            onClick={() => setEditUser(user)}
                                            title={t('common.edit')}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                                            onClick={() => setDeleteUser(user)}
                                            title={t('common.delete')}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <UserFormDialog
                open={!!editUser}
                onClose={() => setEditUser(null)}
                stations={stations}
                user={editUser}
                 roles={roles ?? []}
            />

            <ConfirmDeleteDialog
                open={!!deleteUser}
                onClose={() => setDeleteUser(null)}
                onConfirm={handleDelete}
                loading={deleting}
            />
        </>
    );
}

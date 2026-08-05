import useImport from '@/hooks/use-import';
import { usePage } from '@inertiajs/react';
import { BarChart3, Droplets, FileBarChart, LayoutDashboard, MapPin, Plus, Settings, Settings2Icon, Users } from 'lucide-react';
import React from 'react'

export interface SidebarNavItem {
    key: string;
    label: string;
    href?: string;
    icon: any;
    roles?: string[];
    children?: SidebarNavItem[];
}
export default function useNavItems() {
    const { t } = useImport();
    const { auth } = usePage().props as any;
    const role = auth?.user?.role?.slug;
    const canAccess = (item: SidebarNavItem) => {

        if (!item.roles)
            return true;


        return item.roles.includes(role);

    };


 
    const navItems: SidebarNavItem[] = [

        {
            key: 'dashboard',
            label: t("common.dashboard"),
            href: '/companies/dashboard',
            icon: LayoutDashboard,
        },


        {
            key: 'stations',
            label: t("stations.title"),
            icon: MapPin,
            roles: ['admin' ,'operator','company-admin'],
            children: [
                {
                    key: 'stations-list',
                    label: t("stations.title"),
                    href: '/stations',
                    icon: MapPin,
                }
                
            ]
        },


        {
            key: 'ro',
            label: t("ro-units.title"),
            icon: Droplets,
            roles: ['company-admin','operator'],
            children: [

                {
                    key: 'ro-units',
                    label: t("ro-units.title"),
                    href: '/ro-units',
                    icon: Droplets,
                },


                {
                    key: 'ro-settings',
                    label: t("ro-units.ro-settings"),
                    href: '/ro-units/settings',
                    icon: Settings2Icon,
                    roles: [
                        'company-admin',
                        'operator'
                    ]
                }

            ]
        },


        {
            key: 'readings',
            label: t("readings.title"),
            href: '/readings',
            icon: BarChart3,
            roles: ['company-admin','operator'],
             children: [

                {
                    key: 'add-new-readings',
                    label: t("readings.create.title"),
                    href: '/readings',
                    icon: Plus,
                },

            ]
        },


        {
            key: 'reports',
            label: t("reports.title"),
            href: '/reports',
            icon: FileBarChart,
            roles: [
                'company-admin',
                'manager'
            ]
        },


        {
            key: 'users',
            label: t("users.title"),
            href: '/users',
            icon: Users,
            roles: [
               'company-admin',
            ]
        },


        {
            key: 'settings',
            label: t("users.profile"),
            href: '/users/auth/settings',
            icon: Settings
        }

    ];


    const filteredItems = navItems
        .map(item => {

            if (item.children) {

                return {
                    ...item,
                    children: item.children.filter(canAccess)
                };

            }

            return item;

        })
        .filter(canAccess)
        .filter(item => !item.children || item.children.length);

    return {
        navItems,
        filteredItems
    }
}

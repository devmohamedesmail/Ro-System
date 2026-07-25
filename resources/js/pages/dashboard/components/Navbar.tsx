import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePage, Link } from '@inertiajs/react';
import {
    Bell,
    ChevronDown,
    Menu,
    LogOut,
    Settings,
    User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useInitials } from '@/hooks/use-initials';
import ThemeSelector from '@/components/shared/theme-selector';

import LanguageSelector from '@/components/shared/language-selector';
import useImport from '@/hooks/use-import';
import AuthMenu from '@/components/shared/auth-menu';


interface NavbarProps {
    onMenuToggle: () => void;
}

function useDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return { open, setOpen, ref };
}

export function Navbar({ onMenuToggle }: NavbarProps) {
    const { t, i18n , isRtl } = useImport();
    const page = usePage();
    const { auth } = page.props as { auth: { user: { name: string; email: string; avatar?: string } } };
    const getInitials = useInitials();
    const langDropdown = useDropdown();
    const profileDropdown = useDropdown();

    // const availableStations = mockStations.filter((s) => s.companyId === selectedCompany.id);
    // const unreadAlerts = 2;

    // function handleCompanySelect(company: Company) {
    //     setSelectedCompany(company);
    //     const first = mockStations.filter((s) => s.companyId === company.id)[0];
    //     if (first) setSelectedStation(first);
    //     companyDropdown.setOpen(false);
    // }

    // function handleStationSelect(station: Station) {
    //     setSelectedStation(station);
    //     stationDropdown.setOpen(false);
    // }


    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950">
            {/* Left: Menu toggle */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuToggle}
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    aria-label="Toggle sidebar"
                >
                    <Menu className="h-5 w-5" />
                </button>

                {/* Company Selector */}
                {/* <div className="relative hidden sm:block" ref={companyDropdown.ref}>
                    <button
                        onClick={() => companyDropdown.setOpen((o) => !o)}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800/60 dark:hover:bg-gray-800"
                    >
                        <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">
                            {selectedCompany.logoInitials}
                        </span>
                        <span className="max-w-32 truncate font-medium text-gray-700 dark:text-gray-200">
                            {selectedCompany.name}
                        </span>
                        <ChevronDown
                            className={cn(
                                'h-3.5 w-3.5 text-gray-400 transition-transform',
                                companyDropdown.open && 'rotate-180',
                            )}
                        />
                    </button>

                    {companyDropdown.open && (
                        <div className={cn(
                            'absolute top-full z-50 mt-1.5 min-w-48 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900',
                            isRtl ? 'right-0' : 'left-0',
                        )}>
                            <p className="px-3 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                {t('navbar.companies', 'Companies')}
                            </p>
                            {mockCompanies.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => handleCompanySelect(c)}
                                    className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                                >
                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">
                                        {c.logoInitials}
                                    </span>
                                    <span className="flex-1 text-start">{c.name}</span>
                                    {c.id === selectedCompany.id && (
                                        <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div> */}

                {/* Station Selector */}
                {/* <div className="relative hidden md:block" ref={stationDropdown.ref}>
                    <button
                        onClick={() => stationDropdown.setOpen((o) => !o)}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800/60 dark:hover:bg-gray-800"
                    >
                        <span className="max-w-32 truncate font-medium text-gray-700 dark:text-gray-200">
                            {selectedStation?.name ?? t('navbar.selectStation', 'Select Station')}
                        </span>
                        <ChevronDown
                            className={cn(
                                'h-3.5 w-3.5 text-gray-400 transition-transform',
                                stationDropdown.open && 'rotate-180',
                            )}
                        />
                    </button>

                    {stationDropdown.open && (
                        <div className={cn(
                            'absolute top-full z-50 mt-1.5 min-w-44 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900',
                            isRtl ? 'right-0' : 'left-0',
                        )}>
                            <p className="px-3 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                {t('navbar.stations', 'Stations')}
                            </p>
                            {availableStations.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => handleStationSelect(s)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                                >
                                    <span className="flex-1 text-start">{s.name}</span>
                                    {s.id === selectedStation?.id && (
                                        <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div> */}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
                {/* Notifications */}
                <button
                    className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    // aria-label={`${unreadAlerts} unread alerts`}
                >
                    <Bell className="h-5 w-5" />
                    {/* {unreadAlerts > 0 && (
                        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                            {unreadAlerts}
                        </span>
                    )} */}
                </button>

                <LanguageSelector />
                <ThemeSelector />

                {/* Separator */}
                <div className="mx-1 h-6 w-px bg-gray-200 dark:bg-gray-700" />
            

                {/* User Profile */}
                {/* <div className="relative" ref={profileDropdown.ref}>
                    <button
                        onClick={() => profileDropdown.setOpen((o) => !o)}
                        className="flex items-center gap-2 rounded-lg p-1.5 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="User menu"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                            {getInitials(auth?.user?.name ?? 'User')}
                        </div>
                        <div className="hidden flex-col items-start md:flex">
                            <span className="max-w-28 truncate text-xs font-semibold text-gray-800 dark:text-gray-100">
                                {auth?.user?.name ?? 'User'}
                            </span>
                            <span className="max-w-28 truncate text-[10px] text-gray-500 dark:text-gray-400">
                                {auth?.user?.email ?? ''}
                            </span>
                        </div>
                        <ChevronDown
                            className={cn(
                                'hidden h-3.5 w-3.5 text-gray-400 transition-transform md:block',
                                profileDropdown.open && 'rotate-180',
                            )}
                        />
                    </button>

                    {profileDropdown.open && (
                        <div className={cn(
                            'absolute top-full z-50 mt-1.5 min-w-52 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900',
                            isRtl ? 'left-0' : 'right-0',
                        )}>
                            <div className="border-b border-gray-100 px-3 pb-2 pt-1 dark:border-gray-800">
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                    {auth?.user?.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {auth?.user?.email}
                                </p>
                            </div>
                            <a
                                href="/settings/profile"
                                className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                            >
                                <User className="h-4 w-4 text-gray-400" />
                                {t('navbar.profile', 'Profile')}
                            </a>
                            <a
                                href="/settings"
                                className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                            >
                                <Settings className="h-4 w-4 text-gray-400" />
                                {t('navbar.settings', 'Settings')}
                            </a>
                            <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                                <LogOut className="h-4 w-4" />
                                {t('navbar.logout', 'Sign Out')}
                            </Link>
                        </div>
                    )}
                </div> */}
                <AuthMenu />
            </div>
        </header>
    );
}

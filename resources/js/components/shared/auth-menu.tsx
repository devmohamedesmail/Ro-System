import React, { useState } from 'react';
import { Phone, Mail, ChevronDown, Check, LayoutDashboard, User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Link, router, usePage } from '@inertiajs/react';


export default function AuthMenu() {
    const { t, i18n } = useTranslation();
    const { auth } = usePage().props as any
    const handleLogout = () => {
        router.post('/logout');
    };
    return (
        <div>
            {auth?.user ? (


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg hover:bg-accent/50 transition-all duration-200 outline-none">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center text-black font-semibold text-sm">
                                {auth.user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-medium text-black dark:text-white">{auth.user.name}</p>
                                <p className="text-xs text-black dark:text-white">{t('auth.my-account')}</p>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 sm:w-72">
                        {/* User Info Section */}
                        <div className="p-4 border-b border-border bg-accent/20">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-lg">
                                    {auth.user.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">{auth.user.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{auth.user.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard" className="cursor-pointer">
                                <LayoutDashboard className="w-5 h-5 text-primary" />
                                <span>{t('users.dashboard')}</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href="/users/profile" className="cursor-pointer">
                                <User className="w-5 h-5 text-primary" />
                                <span>{t('users.profile')}</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem variant="destructive" onClick={handleLogout} className="cursor-pointer">
                            <LogOut className="w-5 h-5" />
                            <span>{t('auth.logout')}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary/80 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        {t('auth.login')}
                    </Link>

                </>
            )}
        </div>
    )
}

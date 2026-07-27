
import { Link, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    BarChart3,
    Bell,
    Building2,
    ChevronLeft,
    ChevronRight,
    Droplets,
    FileBarChart,
    LayoutDashboard,
    MapPin,
    Settings,
    Settings2Icon,
    Users,
    X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import useImport from '@/hooks/use-import';
import useComapny from '@/hooks/use-comapny';
import { SidebarNavItem } from '../types';



interface SidebarProps {
    isOpen: boolean;
    isCollapsed: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
    isMobile: boolean;
}

export function Sidebar({ isOpen, isCollapsed, onClose, onToggleCollapse, isMobile }: SidebarProps) {
    const { t,isRtl} = useImport()
    const {company}=useComapny();
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const isActive = (href: string) => {
        if (href === '/dashboard') return currentPath === '/dashboard' || currentPath === '/';
        return currentPath.startsWith(href);
    };

    const CollapseIcon = isRtl
        ? isCollapsed ? ChevronLeft : ChevronRight
        : isCollapsed ? ChevronRight : ChevronLeft;

    const navItems: SidebarNavItem[] = [
        { key: 'dashboard', label: 'Dashboard', href: '/companies/dashboard', icon: LayoutDashboard },
        { key: 'stations', label: t("stations.title"), href: '/stations', icon: MapPin },
        { key: 'ro-units', label: t("ro-units.title"), href: '/ro-units', icon: Droplets , activeUrls: ['/ro-units'] },
        { key: 'ro-units-settings', label: t("ro-units.ro-settings"), href: '/ro-units/settings', icon: Settings2Icon , activeUrls: ['/ro-units/settings'] },
        { key: 'readings', label: t("readings.title"), href: '/readings', icon: BarChart3 },
        { key: 'daily-reports', label: t("reports.title"), href: '/reports', icon: FileBarChart },
        { key: 'inventory', label: t("inventory.title"), href: '/inventories', icon: FileBarChart },
        { key: 'users', label:t("users.title"), href: '/users', icon: Users },
        { key: 'settings', label: t("users.profile"), href: '/users/auth/settings', icon: Settings },
        { key: 'sass-update', label: t("common.sass-settings"), href: '/sass-update', icon: Settings },
        
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Panel */}
            <aside
                className={cn(
                    'fixed top-0 z-50 flex h-full flex-col bg-primary transition-all duration-300 ease-in-out dark:bg-gray-950',
                    'border-gray-200 dark:border-gray-800',
                    isRtl ? 'right-0 border-l' : 'left-0 border-r',
                    // Desktop collapsed/expanded
                    !isMobile && (isCollapsed ? 'w-[72px]' : 'w-64'),
                    // Mobile slide-in/out
                    isMobile && (isOpen ? 'translate-x-0' : isRtl ? 'translate-x-full' : '-translate-x-full'),
                    isMobile && 'w-72 shadow-2xl',
                )}
                aria-label="Main navigation"
            >
                {/* Header */}
                <div className={cn(
                    'flex h-16 shrink-0 items-center border-b border-gray-200 dark:border-gray-800',
                    isCollapsed && !isMobile ? 'justify-center px-4' : 'justify-between px-4',
                )}>
                    {(!isCollapsed || isMobile) && (
                        <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600">
                                {/* <Droplets className="h-4.5 w-4.5 text-white" /> */}
                                <img src={company?.logo} />
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-white dark:text-white">{company?.name}</p>
                                <p className="truncate text-xs text-white dark:text-gray-400">
                                    {t('common.subtitle')}
                                </p>
                            </div>
                        </div>
                    )}

                    {isCollapsed && !isMobile && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                            <Droplets className="h-4 w-4 text-white" />
                        </div>
                    )}

                    {isMobile && (
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                            aria-label="Close sidebar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    <ul className="space-y-0.5" role="list">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            const Icon = item.icon;
                            return (
                                <li key={item.key}>
                                    <Link
                                        href={item.href}
                                        onClick={isMobile ? onClose : undefined}
                                        className={cn(
                                            'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                                            active
                                                ? 'bg-primary text-white dark:bg-primary dark:text-white'
                                                : 'text-white hover:bg-gray-100 hover:text-black dark:text-white dark:hover:bg-gray-800/70 dark:hover:text-gray-100',
                                            isCollapsed && !isMobile && 'justify-center px-2',
                                        )}
                                        aria-current={active ? 'page' : undefined}
                                        title={isCollapsed && !isMobile ? item.label : undefined}
                                    >
                                        {/* Active indicator */}
                                        {active && (
                                            <span
                                                className={cn(
                                                    'absolute top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-priamry dark:bg-white',
                                                    isRtl ? 'right-0' : 'left-0',
                                                )}
                                            />
                                        )}

                                        <Icon
                                            className={cn(
                                                'h-4.5 w-4.5 shrink-0 transition-colors',
                                                active
                                                    ? 'text-white dark:text-white'
                                                    : 'text-white group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300',
                                            )}
                                        />

                                        {(!isCollapsed || isMobile) && (
                                            <>
                                                <span className="flex-1 truncate">{item.label}</span>
                                                {item.badge != null && item.badge > 0 && (
                                                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer / Collapse Toggle */}
                {!isMobile && (
                    <div className="shrink-0 border-t border-gray-200 p-3 dark:border-gray-800">
                        <button
                            onClick={onToggleCollapse}
                            className={cn(
                                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200',
                                isCollapsed && 'justify-center px-2',
                            )}
                            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            <CollapseIcon className="h-4 w-4 shrink-0 text-white" />
                            {!isCollapsed && (
                                <span className="text-xs text-white font-medium">
                                    {t('common.collapse')}
                                </span>
                            )}
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}

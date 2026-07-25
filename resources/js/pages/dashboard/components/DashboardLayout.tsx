import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const SIDEBAR_COLLAPSED_KEY = 'ro_sidebar_collapsed';
const SIDEBAR_BREAKPOINT = 768; // md

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    const [isMobile, setIsMobile] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true';
    });

    // Sync RTL direction to document
    useEffect(() => {
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [isRtl, i18n.language]);

    // Responsive detection
    useEffect(() => {
        function checkMobile() {
            const mobile = window.innerWidth < SIDEBAR_BREAKPOINT;
            setIsMobile(mobile);
            if (mobile) setMobileOpen(false);
        }
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    function handleToggleCollapse() {
        setIsCollapsed((prev) => {
            const next = !prev;
            localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
            return next;
        });
    }

    function handleMobileToggle() {
        if (isMobile) {
            setMobileOpen((o) => !o);
        } else {
            handleToggleCollapse();
        }
    }

    const sidebarWidth = isMobile ? 0 : isCollapsed ? 72 : 256;

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
            <Sidebar
                isOpen={mobileOpen}
                isCollapsed={isCollapsed}
                onClose={() => setMobileOpen(false)}
                onToggleCollapse={handleToggleCollapse}
                isMobile={isMobile}
            />

            {/* Main content area — shifted by sidebar width */}
            <div
                className={cn(
                    'flex min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out',
                    !isMobile && (isRtl ? 'mr-auto' : 'ml-auto'),
                )}
                style={
                    !isMobile
                        ? isRtl
                            ? { marginRight: sidebarWidth }
                            : { marginLeft: sidebarWidth }
                        : undefined
                }
            >
                <Navbar onMenuToggle={handleMobileToggle} />

                {/* Scrollable page content */}
                <main
                    id="main-content"
                    className="flex-1 overflow-y-auto"
                    tabIndex={-1}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}

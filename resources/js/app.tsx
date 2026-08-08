import { createInertiaApp } from '@inertiajs/react';
// import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import './i18n/index'
import toast, { Toaster } from 'react-hot-toast';
import PWA from './components/shared/PWA';
import InstallPWA from './components/shared/InstallPWA';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return null;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
                <PWA />
                <InstallPWA />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#00b8a4',
    },
});

// This will set light / dark mode on load...
initializeTheme();

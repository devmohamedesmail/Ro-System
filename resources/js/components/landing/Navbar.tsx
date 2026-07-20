import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Droplets,
    Menu,
    X,
    Globe,
    Sun,
    Moon,
    ChevronDown,
} from 'lucide-react';

const navLinks = [
    { key: 'landing.nav.features' },
    { key: 'landing.nav.dashboard' },
    { key: 'landing.nav.workflow' },
    { key: 'landing.nav.analytics' },
    { key: 'landing.nav.pricing' },
];

export default function Navbar() {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm'
                    : 'bg-transparent'
            }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2.5 shrink-0"
                >
                    <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/30">
                        <Droplets className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                        {t('landing.brand')}
                    </span>
                </motion.div>

                {/* Desktop Nav Links */}
                <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="hidden lg:flex items-center gap-1"
                >
                    {navLinks.map(({ key }) => (
                        <li key={key}>
                            <button
                                onClick={() => scrollTo(key.split('.')[2])}
                                className="px-3.5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/30 rounded-lg transition-all duration-200"
                            >
                                {t(key)}
                            </button>
                        </li>
                    ))}
                </motion.ul>

                {/* Right Actions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="flex items-center gap-2 shrink-0"
                >
                    {/* Language Switcher */}
                    <button
                        aria-label={t('landing.nav.language')}
                        className="hidden sm:flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
                    >
                        <Globe className="w-4 h-4" />
                        <ChevronDown className="w-3 h-3" />
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setDark(!dark)}
                        aria-label={t('landing.nav.theme')}
                        className="flex items-center justify-center w-9 h-9 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
                    >
                        {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>

                    {/* Login */}
                    <a
                        href="/login"
                        className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                    >
                        {t('landing.nav.login')}
                    </a>

                    {/* CTA */}
                    <a
                        href="/register"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        {t('landing.nav.cta')}
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        className="lg:hidden flex items-center justify-center w-9 h-9 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </motion.div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="lg:hidden overflow-hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                            {navLinks.map(({ key }) => (
                                <button
                                    key={key}
                                    onClick={() => scrollTo(key.split('.')[2])}
                                    className="text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/30 rounded-xl transition-all duration-200"
                                >
                                    {t(key)}
                                </button>
                            ))}
                            <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-3 flex flex-col gap-2">
                                <a
                                    href="/login"
                                    className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                                >
                                    {t('landing.nav.login')}
                                </a>
                                <a
                                    href="/register"
                                    className="px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl text-center"
                                >
                                    {t('landing.nav.cta')}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

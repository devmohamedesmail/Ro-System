import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {  Menu, X} from 'lucide-react';
import { Link } from '@inertiajs/react';
import ThemeSelector from '../shared/theme-selector';
import LanguageSelector from '../shared/language-selector';
import Logo from '../shared/logo';
import AuthMenu from '../shared/auth-menu';

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
               <Logo />

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
                   
                     <LanguageSelector />
                     <ThemeSelector />

                    
                   
                    <AuthMenu />

                    {/* CTA */}
                    <Link
                        href="/companies/register/page"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary/80 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        {t('landing.nav.cta')}
                    </Link>

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

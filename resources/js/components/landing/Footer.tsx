import React from 'react';
import { useTranslation } from 'react-i18next';
import { Droplets, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const footerLinks = [
    {
        groupKey: 'landing.footer.product',
        links: ['landing.footer.features', 'landing.footer.dashboard', 'landing.footer.pricing', 'landing.footer.changelog'],
    },
    {
        groupKey: 'landing.footer.company',
        links: ['landing.footer.about', 'landing.footer.blog', 'landing.footer.careers', 'landing.footer.contact'],
    },
    {
        groupKey: 'landing.footer.legal',
        links: ['landing.footer.privacy', 'landing.footer.terms', 'landing.footer.security', 'landing.footer.cookies'],
    },
    {
        groupKey: 'landing.footer.support',
        links: ['landing.footer.docs', 'landing.footer.status', 'landing.footer.community', 'landing.footer.api'],
    },
];

const socials = [
    { icon: Twitter, href: '#', labelKey: 'landing.footer.twitter' },
    { icon: Github, href: '#', labelKey: 'landing.footer.github' },
    { icon: Linkedin, href: '#', labelKey: 'landing.footer.linkedin' },
    { icon: Mail, href: '#', labelKey: 'landing.footer.email' },
];

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/30">
                                <Droplets className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-white text-lg tracking-tight">{t('landing.brand')}</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed mb-6">{t('landing.footer.tagline')}</p>

                        {/* Socials */}
                        <div className="flex gap-2">
                            {socials.map(({ icon: Icon, href, labelKey }) => (
                                <a
                                    key={labelKey}
                                    href={href}
                                    aria-label={t(labelKey)}
                                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-500/20 hover:text-teal-400 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map(({ groupKey, links }) => (
                        <div key={groupKey}>
                            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">{t(groupKey)}</h3>
                            <ul className="space-y-2.5">
                                {links.map((linkKey) => (
                                    <li key={linkKey}>
                                        <a
                                            href="#"
                                            className="text-sm text-slate-400 hover:text-teal-400 transition-colors duration-200"
                                        >
                                            {t(linkKey)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-slate-500">
                        {t('landing.footer.copyright', { year })}
                    </p>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs text-slate-500">{t('landing.footer.status')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

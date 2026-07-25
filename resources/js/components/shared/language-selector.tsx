
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
    const { t, i18n } = useTranslation()
    const LANGUAGES = [
        { code: 'en', label: 'English' },
        { code: 'ar', label: 'العربية' },
    ];
    const currentLang = LANGUAGES.find(l => l.code === i18n.language) ?? LANGUAGES[0];

    const switchLanguage = (code: string) => {
        i18n.changeLanguage(code);
        document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = code;
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors outline-none">
              <Globe className="h-4.5 w-4.5" />  {currentLang.code} <ChevronDown size={11} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-24">
                {LANGUAGES.map(l => (
                    <DropdownMenuItem
                        key={l.code}
                        onClick={() => switchLanguage(l.code)}
                        className={`text-xs justify-between gap-2 ${i18n.language === l.code ? 'text-primary font-semibold' : ''}`}
                    >
                        {l.label} {i18n.language === l.code && <Check size={11} />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

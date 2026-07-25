import React from 'react'
import { useAppearance } from '@/hooks/use-appearance';
import {
   
    Moon,
    Sun,
   
} from 'lucide-react';
export default function ThemeSelector() {
   const { resolvedAppearance, updateAppearance } = useAppearance();
    function handleThemeToggle() {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    }
  
    return (
     <button
                    onClick={handleThemeToggle}
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    aria-label="Toggle dark mode"
                >
                    {resolvedAppearance === 'dark' ? (
                        <Sun className="h-4.5 w-4.5" />
                    ) : (
                        <Moon className="h-4.5 w-4.5" />
                    )}
                </button>
  )
}

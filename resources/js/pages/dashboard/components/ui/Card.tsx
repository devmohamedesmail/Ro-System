import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    padding?: 'sm' | 'md' | 'lg' | 'none';
    hover?: boolean;
}

export function Card({ children, className, padding = 'md', hover = false, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-xl border border-gray-200 bg-white shadow-sm',
                'dark:border-gray-700/50 dark:bg-gray-900',
                hover && 'transition-shadow duration-200 hover:shadow-md dark:hover:shadow-gray-900/40',
                padding === 'none' && 'p-0',
                padding === 'sm' && 'p-3',
                padding === 'md' && 'p-5',
                padding === 'lg' && 'p-6',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    className?: string;
}

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
    return (
        <div className={cn('mb-4 flex items-start justify-between', className)}>
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                {subtitle && (
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}

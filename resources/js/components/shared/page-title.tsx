import React, { ReactNode } from 'react'

interface PageTitleProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  children?: ReactNode
}

export default function PageTitle({
  title,
  subtitle,
  icon,
  children,
}: PageTitleProps) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      {/* Title */}
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-200 dark:shadow-cyan-900/40">
            {icon}
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Optional Actions */}
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  )
}
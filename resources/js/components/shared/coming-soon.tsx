import useImport from '@/hooks/use-import'
import { Clock3, Sparkles } from 'lucide-react';
import React from 'react'

export default function ComingSoon() {
 const{t}=useImport();
    return (
   <div className="flex min-h-[500px] items-center justify-center p-6">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative flex flex-col items-center px-6 py-16 text-center sm:px-12">
          {/* Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <div className="relative">
              <Clock3 className="h-10 w-10" strokeWidth={1.7} />
              <Sparkles className="absolute -right-3 -top-3 h-5 w-5 fill-current" />
            </div>
          </div>

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {t('common.coming_soon')}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('common.something_great_is_coming')}
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            {t('common.coming_soon_description')}
          </p>

          {/* Bottom info */}
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock3 className="h-4 w-4" />
            <span>{t('common.stay_tuned')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

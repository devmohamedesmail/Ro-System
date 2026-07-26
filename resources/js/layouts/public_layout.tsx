import React from 'react'
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import useImport from '@/hooks/use-import';
import { Head } from '@inertiajs/react';

export default function PublicLayout( { children }: { children: React.ReactNode } ) {
    const { t } = useImport();
    return (
         <>
            <Head title={t('companies.register-company')} />

            <div className="min-h-screen bg-white dark:bg-slate-950 antialiased">
                <Navbar />

                <main className='my-10 py-10'>
                   {children}
                </main>

                <Footer />
            </div>
        </>
    )
}

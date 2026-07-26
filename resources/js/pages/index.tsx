import React from 'react';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import TrustedSection from '@/components/landing/TrustedSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import DashboardSection from '@/components/landing/DashboardSection';
import WorkflowSection from '@/components/landing/WorkflowSection';
import AnalyticsSection from '@/components/landing/AnalyticsSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import useImport from '@/hooks/use-import';
import useComapny from '@/hooks/use-comapny';

export default function LandingPage() {
    const { t } = useImport();
    const {company}=useComapny();
    

    return (
        <>
            <Head title={t('landing.meta.title')} />

            <div className="min-h-screen bg-white dark:bg-slate-950 antialiased">
                <Navbar />

                <main>
                    <HeroSection />
                    <TrustedSection />
                    <FeaturesSection />
                    <DashboardSection />
                    <WorkflowSection />
                    <AnalyticsSection />
                    <BenefitsSection />
                    <TestimonialsSection />
                    <PricingSection />
                    <FAQSection />
                    <CTASection />
                </main>

                <Footer />
            </div>
        </>
    );
}

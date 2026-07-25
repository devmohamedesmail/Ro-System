export interface Setting {
    id: number;

    // Application
    app_name_ar: string;
    app_name_en: string;
    app_url: string | null;
    app_version: string;

    // Branding
    app_logo: string | null ;
    app_logo_public_id: string | null;
    app_logo_dark: string | null;
    logo_dark_public_id: string | null;
    app_favicon: string | null;
    favicon_public_id: string | null;
    primary_color: string;
    secondary_color: string | null;

    // Company
    company_name: string | null;
    email: string | null;
    phone: string | null;
    whatsapp: string | null;
    website: string | null;
    address: string | null;

    // Social Media
    facebook: string | null;
    instagram: string |null;
    linkedin: string | null;
    x: string | null;
    youtube: string | null;

    // SEO
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    og_image: string | null;

    // Localization
    default_language: string;
    default_timezone: string;

    // System
    maintenance_mode: boolean;
    allow_registration: boolean;
    email_verification: boolean;

    // Analytics
    google_analytics_id: string | null;
    google_tag_manager_id: string | null;
    facebook_pixel_id: string | null;

    // Footer
    footer_text: string | null;
    copyright: string | null;

    // Timestamps
    created_at: string;
    updated_at: string;
}
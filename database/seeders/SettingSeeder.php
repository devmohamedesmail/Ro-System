<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::updateOrCreate(
            ['id' => 1],
            [
                // Application
                'app_name_ar' => 'رو سيستم',
                'app_name_en' => 'RO System',
                'app_url' => env('APP_URL'),
                'app_version' => '1.0.0',

                // Branding
                'app_logo' => "https://placehold.co/400x120/2563eb/ffffff?text=RO+System",
                'app_logo_public_id' => null,
                'app_logo_dark' => "https://placehold.co/400x120/2563eb/ffffff?text=RO+System",
                'logo_dark_public_id' => null,
                'app_favicon' => "https://placehold.co/400x120/2563eb/ffffff?text=RO+System",
                'favicon_public_id' => null,
                'primary_color' => '#2563eb',
                'secondary_color' => '#0f172a',

                // Company
                'company_name' => 'RO System',
                'email' => 'info@rosystem.com',
                'phone' => '+201000000000',
                'whatsapp' => '+201000000000',
                'website' => env('APP_URL'),
                'address' => 'Egypt',

                // Social Media
                'facebook' => null,
                'instagram' => null,
                'linkedin' => null,
                'x' => null,
                'youtube' => null,

                // SEO
                'meta_title' => 'RO System - Water Treatment Management SaaS',
                'meta_description' => 'Professional SaaS platform for managing Reverse Osmosis plants, stations, maintenance, technicians, readings, interventions and reports.',
                'meta_keywords' => 'RO, Reverse Osmosis, Water Treatment, SaaS, Maintenance, Reports',
                'og_image' => null,

                // Localization
                'default_language' => 'en',
                'default_timezone' => 'Africa/Cairo',

                // System
                'maintenance_mode' => false,
                'allow_registration' => true,
                'email_verification' => true,

                // Analytics
                'google_analytics_id' => null,
                'google_tag_manager_id' => null,
                'facebook_pixel_id' => null,

                // Footer
                'footer_text' => 'Professional Reverse Osmosis Management System.',
                'copyright' => '© ' . date('Y') . ' RO System. All rights reserved.',
            ]
        );
    }
}
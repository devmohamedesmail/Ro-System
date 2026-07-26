<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /** @use HasFactory<\Database\Factories\SettingFactory> */
    use HasFactory;


    protected $fillable = [

        // Application
        'app_name_ar',
        'app_name_en',
        'app_url',
        'app_version',

        // Branding
        'app_logo',
        'app_logo_public_id',
        'app_logo_dark',
        'logo_dark_public_id',
        'app_favicon',
        'favicon_public_id',
        'primary_color',
        'secondary_color',

        // Company
        'company_name',
        'email',
        'phone',
        'whatsapp',
        'website',
        'address',

        // Social Media
        'facebook',
        'instagram',
        'linkedin',
        'x',
        'youtube',

        // SEO
        'meta_title',
        'meta_description',
        'meta_keywords',
        'og_image',

        // Localization
        'default_language',
        'default_timezone',

        // System
        'maintenance_mode',
        'allow_registration',
        'email_verification',

        // Analytics
        'google_analytics_id',
        'google_tag_manager_id',
        'facebook_pixel_id',

        // Footer
        'footer_text',
        'copyright',

    ];


    protected $casts = [

        'maintenance_mode' => 'boolean',
        'allow_registration' => 'boolean',
        'email_verification' => 'boolean',

    ];
}
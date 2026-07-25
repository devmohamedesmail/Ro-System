<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            // Application
            $table->string('app_name_ar')->default('رو سيستم');
            $table->string('app_name_en')->default('RO System');
            $table->string('app_url')->nullable();
            $table->string('app_version')->default('1.0.0');

            // Branding
            $table->longText('app_logo')->nullable();
            $table->string('app_logo_public_id')->nullable();
            $table->longText('app_logo_dark')->nullable();
            $table->string('logo_dark_public_id')->nullable();
            $table->longText('app_favicon')->nullable();
            $table->string('favicon_public_id')->nullable();
            $table->string('primary_color')->default('#2563eb');
            $table->string('secondary_color')->nullable();

            // Company
            $table->string('company_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('website')->nullable();
            $table->text('address')->nullable();

            // Social Media
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('x')->nullable();
            $table->string('youtube')->nullable();

            // SEO
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->string('og_image')->nullable();

            // Localization
            $table->string('default_language')->default('en');
            $table->string('default_timezone')->default('Africa/Cairo');

            // System
            $table->boolean('maintenance_mode')->default(false);
            $table->boolean('allow_registration')->default(true);
            $table->boolean('email_verification')->default(true);

            // Analytics & Integrations
            $table->string('google_analytics_id')->nullable();
            $table->string('google_tag_manager_id')->nullable();
            $table->string('facebook_pixel_id')->nullable();

            // Footer
            $table->text('footer_text')->nullable();
            $table->string('copyright')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
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
        Schema::create('ro_unit_reading_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ro_unit_id')->constrained('ro_units')->cascadeOnDelete();
            $table->foreignId('reading_category_id')->constrained('reading_categories')->cascadeOnDelete();
            $table->enum('usage', ['READING','DAILY_REPORT','BOTH'])->default('READING');    
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->unique(['ro_unit_id','reading_category_id']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ro_unit_reading_categories');
    }
};
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
        Schema::create('reading_parameters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reading_category_id')->nullable()->constrained('reading_categories')->cascadeOnDelete();
            $table->foreignId('company_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('ro_unit_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('ro_unit_reading_category_id')->nullable()->constrained()->cascadeOnDelete();       
            $table->string('name');
            $table->string('code')->nullable();
            $table->string('unit')->nullable();
            $table->enum('input_type', ['NUMBER','TEXT','BOOLEAN'])->default('NUMBER');
            $table->enum('usage', ['READING', 'DAILY_REPORT','BOTH'])->default('READING');
            $table->boolean('track_difference')->default(false);
            $table->decimal('min_value', 10, 3)->nullable();
            $table->decimal('max_value', 10, 3)->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_required')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->unique(['reading_category_id','code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reading_parameters');
    }
};
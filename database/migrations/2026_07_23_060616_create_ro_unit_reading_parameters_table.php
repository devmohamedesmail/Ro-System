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
        Schema::create('ro_unit_reading_parameters', function (Blueprint $table) {
            $table->id();

            $table->foreignId('ro_unit_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('ro_unit_reading_category_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('reading_parameter_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();

            $table->string('name');
            $table->string('display_name')->nullable();

            $table->string('code')
                ->nullable();

            $table->string('unit')
                ->nullable();

            $table->enum('input_type', [
                'NUMBER',
                'TEXT',
                'BOOLEAN',
            ])->default('NUMBER');

            $table->enum('usage', [
                'READING',
                'DAILY_REPORT',
                'BOTH',
            ])->default('READING');

            $table->boolean('track_difference')
                ->default(false);

            $table->decimal('min_value', 10, 3)
                ->nullable();

            $table->decimal('max_value', 10, 3)
                ->nullable();

            $table->decimal('alarm_low', 12, 2)->nullable();
            $table->decimal('alarm_high', 12, 2)->nullable();
            $table->string('default_value')->nullable();

            $table->integer('order')
                ->default(0);

            $table->boolean('is_required')
                ->default(false);

            $table->boolean('is_active')
                ->default(true);

            $table->timestamps();

            $table->unique(
                ['ro_unit_id', 'reading_parameter_id'],
                'ru_rp_unique'
            );

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ro_unit_reading_parameters');
    }
};

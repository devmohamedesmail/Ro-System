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
        Schema::create('daily_report_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daily_report_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();

           $table->foreignId('ro_unit_reading_parameter_id')
    ->nullable()
    ->constrained('ro_unit_reading_parameters')
    ->cascadeOnDelete();

            $table->decimal('previous_value', 12, 2)
                ->nullable();

            $table->decimal('current_value', 12, 2)
                ->nullable();

            $table->decimal('difference', 12, 2)
                ->nullable();
            $table->timestamps();

           $table->unique(
    ['daily_report_id', 'ro_unit_reading_parameter_id'],
    'daily_report_values_report_parameter_unique'
);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_report_values');
    }
};
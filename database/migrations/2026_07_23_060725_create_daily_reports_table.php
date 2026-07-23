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
        Schema::create('daily_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ro_unit_id')
                ->constrained('ro_units')
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained()
                ->restrictOnDelete();

            $table->date('report_date');

            /*
    |--------------------------------------------------------------------------
    | Production
    |--------------------------------------------------------------------------
    */

            $table->float('running_hours')
                ->nullable();

            $table->float('water_production')
                ->nullable();

            $table->float('client_consumption')
                ->nullable();

            $table->float('outside_sales')
                ->nullable();

            $table->float('network_sales')
                ->nullable();

            /*
    |--------------------------------------------------------------------------
    | Power Consumption
    |--------------------------------------------------------------------------
    */

            $table->float('high_pressure_pump_power')
                ->nullable();

            $table->float('booster_pump_power')
                ->nullable();

            $table->float('specific_power')
                ->nullable();

            /*
    |--------------------------------------------------------------------------
    | Product Tank
    |--------------------------------------------------------------------------
    */

            $table->float('free_chlorine')
                ->nullable();

            $table->float('tank_level')
                ->nullable();

            /*
    |--------------------------------------------------------------------------
    | Chemicals
    |--------------------------------------------------------------------------
    */

            $table->float('anti_scalant_pre_level')
                ->nullable();

            $table->float('anti_scalant_preparation')
                ->nullable();

            $table->float('anti_scalant_current_level')
                ->nullable();

            $table->float('anti_scalant_consumption')
                ->nullable();

            $table->float('anti_scalant_strength')
                ->nullable();

            $table->float('coagulant_consumption')
                ->nullable();

            $table->float('smbs_consumption')
                ->nullable();

            $table->float('chlorine_consumption')
                ->nullable();

            $table->float('soda_consumption')
                ->nullable();

            /*
    |--------------------------------------------------------------------------
    | Feed Pump
    |--------------------------------------------------------------------------
    */

            $table->float('feed_pump_operation_hours')
                ->nullable();

            $table->float('feed_pump_ampere')
                ->nullable();

            $table->float('feed_pump_in_pressure')
                ->nullable();

            $table->float('feed_pump_out_pressure')
                ->nullable();

            $table->float('feed_pump_frequency')
                ->nullable();

            $table->float('feed_pump_speed')
                ->nullable();

            /*
    |--------------------------------------------------------------------------
    | Notes
    |--------------------------------------------------------------------------
    */

            $table->text('actions')
                ->nullable();

            $table->text('recommendations')
                ->nullable();

            $table->timestamps();

            $table->unique([
                'ro_unit_id',
                'report_date',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_reports');
    }
};

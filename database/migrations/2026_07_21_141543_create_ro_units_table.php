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
        Schema::create('ro_units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('station_id')->constrained()->cascadeOnDelete();
            $table->string('name')->nullable();
            $table->string('code')->nullable();
            $table->float('capacity')->nullable();
            $table->text('description')->nullable();
            $table->string('serial_number')->nullable();
            $table->string('manufacturer')->nullable();

            $table->unsignedInteger('pressure_vessels')->nullable();
            $table->unsignedInteger('membranes_per_vessel')->nullable();
            $table->unsignedInteger('total_membranes')->nullable();
            $table->string('membrane_model')->nullable();
            $table->string('hpp_model')->nullable();
            $table->string('hpp_brand')->nullable();
            $table->decimal('hpp_power_kw', 8, 2)->nullable();
            $table->string('feed_pump_model')->nullable();
            $table->string('chemical_dosing_model')->nullable();
            $table->unsignedInteger('sand_filters')->nullable();
            $table->unsignedInteger('carbon_filters')->nullable();
            $table->unsignedInteger('cartridge_filters')->nullable();
            $table->string('cartridge_size')->nullable();
            $table->decimal('design_flow', 10, 2)->nullable();
            $table->decimal('recovery_rate', 5, 2)->nullable();
            $table->decimal('design_pressure', 10, 2)->nullable();
            $table->string('plc_model')->nullable();
            $table->string('vfd_model')->nullable();
            $table->boolean('is_active')->default(true);
            $table->enum('status',["RUNNING","STOPPED","MAINTENANCE"])->default("STOPPED");
            $table->string("stop_reason")->nullable();
            
            $table->timestamps();

            $table->unique(['station_id', 'name']);
            $table->index('station_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ro_units');
    }
};
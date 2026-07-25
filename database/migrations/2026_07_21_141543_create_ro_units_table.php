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
            $table->foreignId('station_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('name')->nullable();
            $table->string('code')->nullable();
            $table->float('capacity')->nullable();
            $table->text('description')->nullable();
            $table->string('serial_number')->nullable();
            $table->string('manufacturer')->nullable();

            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // @@unique([stationId, name])
            $table->unique(['station_id', 'name']);

            // @@index([stationId])
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
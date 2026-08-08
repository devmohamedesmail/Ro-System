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
        Schema::create('material_receiving_forms', function (Blueprint $table) {
            $table->id();
             // Form Number
            $table->string('form_number')->unique();

            // Header
            $table->string('location')->nullable();
            $table->string('from_plant')->nullable();
            $table->string('store_location')->nullable();

            $table->date('from_date')->nullable();
            $table->date('to_date')->nullable();

            // Remarks
            $table->text('remarks')->nullable();

            // Workflow / Approvals
            $table->foreignId('received_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignId('reviewed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignId('requested_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignId('approved_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // Organizational Information
            $table->string('operator')->nullable();
            $table->string('area_supervisor')->nullable();
            $table->string('department')->nullable();
            $table->string('department_head')->nullable();

            // Distribution List
            $table->string('distribution_original')->nullable();
            $table->string('distribution_green')->nullable();
            $table->string('distribution_red')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material_receiving_forms');
    }
};
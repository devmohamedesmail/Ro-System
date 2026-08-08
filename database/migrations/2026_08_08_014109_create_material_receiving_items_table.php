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
        Schema::create('material_receiving_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('material_receiving_form_id')
                ->constrained('material_receiving_forms')
                ->cascadeOnDelete();

            // S.N.
            $table->unsignedInteger('serial_number');

            // Material
            $table->string('item_code')->nullable();
            $table->text('material_description')->nullable();

            // Part Serial Number
            $table->string('part_serial_number')->nullable();

            // Valuation
            $table->string('valuation_type')->nullable();

            // Storage
            $table->string('bin_location')->nullable();

            // Quantity
            $table->string('unit')->nullable();
            $table->decimal('quantity', 15, 3)->default(0);

            // Documents
            $table->string('sto_pro_no')->nullable();
            $table->string('invoice_no')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material_receiving_items');
    }
};
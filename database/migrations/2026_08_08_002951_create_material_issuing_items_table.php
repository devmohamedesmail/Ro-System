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
        Schema::create('material_issuing_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('station_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('material_issue_form_id')->nullable()->constrained("material_issuing_forms")->nullOnDelete();
            $table->unsignedInteger('serial_number')->nullable();
            $table->string('item_code')->nullable();
            $table->string('valuation_type')->nullable();
            $table->string('material_description')->nullable();
            $table->string('pm_order')->nullable();
            $table->string('unit')->nullable();
            $table->decimal('balance',15,3)->default(0);
            $table->decimal('quantity',15,3)->default(0);
            $table->decimal('balance_after',15,3)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material_issuing_items');
    }
};
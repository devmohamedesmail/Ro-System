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
        Schema::create('material_issuing_forms', function (Blueprint $table) {
            $table->id();
            $table->string('form_number')->unique();
            $table->string('from_location')->nullable();
            $table->string('store_location')->nullable();
            $table->date('from_date')->nullable();
            $table->date('to_date')->nullable();
            $table->boolean('is_transfer')->default(false);
            $table->boolean('is_maintenance_direct_issue')->default(false);
            $table->longText('remarks')->nullable();
            $table->foreignId('issued_by')->nullable()->constrained("users")->nullOnDelete();
            $table->foreignId('recieved_by')->nullable()->constrained("users")->nullOnDelete();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material_issuing_forms');
    }
};
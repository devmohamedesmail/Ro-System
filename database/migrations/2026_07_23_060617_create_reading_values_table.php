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
        Schema::create('reading_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reading_session_id')->constrained('reading_sessions')->cascadeOnDelete();
            $table->foreignId('ro_unit_reading_parameter_id')->constrained()->cascadeOnDelete();
            $table->decimal('value', 10, 3);
            $table->string('notes')->nullable();
            $table->timestamps();
            $table->unique(
                ['reading_session_id', 'ro_unit_reading_parameter_id'],
                'reading_value_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reading_values');
    }
};

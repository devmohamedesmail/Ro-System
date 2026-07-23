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
            $table->foreignId('session_id')
                ->constrained('reading_sessions')
                ->cascadeOnDelete();

            $table->foreignId('parameter_id')
                ->constrained('reading_parameters')
                ->restrictOnDelete();

            $table->decimal(
                'value',
                10,
                3
            );

            $table->timestamps();

            $table->unique([
                'session_id',
                'parameter_id',
            ]);
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

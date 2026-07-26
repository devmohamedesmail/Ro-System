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
                ->nullable()->constrained()
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->nullable()->constrained()
                ->restrictOnDelete();

            $table->date('report_date')->nullable();

            $table->text('actions')->nullable();

            $table->text('recommendations')->nullable();
            $table->timestamps();

            $table->unique([
                'ro_unit_id',
                'report_date'
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
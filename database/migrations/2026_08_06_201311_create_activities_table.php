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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->foreignId('station_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('ro_unit_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string("title");
            $table->longText("description")->nullable();
            $table->enum("type",["maintenance","inspection","cleaning","replacement","calibration","audit","other"])->default("other");
            $table->enum("priority",["low","medium","high","urgent"])->default("medium");
            $table->enum("status",["pending","in_progress","completed","cancelled"])->default("pending");
            $table->timestamp('planned_start_at')->nullable();
            $table->timestamp('planned_end_at')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->boolean("is_recurring")->default(false);
            $table->unsignedInteger('repeat_every_days')->nullable();
            $table->foreignId('created_by')->constrained("users")->cascadeOnDelete();
            $table->foreignId('assigned_to')->nullable()->constrained("users")->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
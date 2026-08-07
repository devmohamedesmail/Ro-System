<?php

use App\Http\Controllers\ActivityController;
use Illuminate\Support\Facades\Route;

Route::prefix('activities')->middleware('auth')->group(function () {
    Route::controller(ActivityController::class)->group(function () {
        Route::get('/', 'activities_page')->name('activities.page');
        Route::get('/create/page', 'create_activities_page')->name('create.activities.page');
        Route::post('/store', 'store')->name('activities.store');
        Route::post('/tasks/{task}/toggle', 'toggleTask')->name('activities.tasks.toggle');
        Route::put('/{activity}/status', 'updateStatus')->name('activities.status.update');
    });
});
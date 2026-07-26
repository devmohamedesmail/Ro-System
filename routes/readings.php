<?php

use App\Http\Controllers\ReadingController;
use Illuminate\Support\Facades\Route;

Route::prefix('readings')->controller(ReadingController::class)->group(function () {
    Route::get('/', 'readings_page')->name('readings.page')->middleware("auth");
    Route::get('/create', 'create_page')->name('readings.create')->middleware("auth");
    Route::post('/', 'store')->name('readings.store')->middleware("auth");
    Route::get('/ro-unit/{id}', 'ro_unit_readings_page')->name('ro_unit.readings.page')->middleware("auth");
});
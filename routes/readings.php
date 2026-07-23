<?php

use App\Http\Controllers\ReadingController;
use Illuminate\Support\Facades\Route;

Route::prefix('readings')->controller(ReadingController::class)->group(function () {
    Route::get('/', 'readings_page')->name('readings.page');
    Route::get('/create', 'create_page')->name('readings.create');
    Route::post('/', 'store')->name('readings.store');
});

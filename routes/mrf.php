<?php

use App\Http\Controllers\MRFController;
use Illuminate\Support\Facades\Route;

Route::prefix('mrf')->middleware('auth')->group(function () {
    Route::controller(MRFController::class)->group(function () {
        Route::get('/', 'mrf_page')->name('mrf.page');
        Route::post('/', 'store')->name('mrf.store');
    });
});
<?php

use App\Http\Controllers\MIFController;
use Illuminate\Support\Facades\Route;

Route::prefix('mif')->middleware('auth')->group(function () {
    Route::controller(MIFController::class)->group(function () {
        Route::get('/', 'mif_page')->name('mif.page');
        Route::post('/', 'store')->name('mif.store');
    });
});
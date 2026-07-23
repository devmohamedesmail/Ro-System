<?php

use App\Http\Controllers\StationController;
use Illuminate\Support\Facades\Route;

Route::prefix('stations')->group(function () {
    Route::controller(StationController::class)->group(function () {
        Route::get('/', 'stations_page')->name('stations.page');
        Route::post('/store', 'store')->name('stations.store');
        Route::put('/{station}', 'update')->name('stations.update');
        Route::delete('/{station}', 'destroy')->name('stations.destroy');
    });
});

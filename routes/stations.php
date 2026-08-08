<?php

use App\Http\Controllers\StationController;
use Illuminate\Support\Facades\Route;

Route::prefix('stations')->group(function () {
    Route::controller(StationController::class)->group(function () {
        Route::get('/', 'stations_page')->name('stations.page')->middleware("auth");
        Route::get('/operators', 'station_operators')->name('station.operators')->middleware("auth");
        Route::post('/store', 'store')->name('stations.store')->middleware("auth");
        Route::put('/{station}', 'update')->name('stations.update')->middleware("auth");
        Route::delete('/{station}', 'destroy')->name('stations.destroy')->middleware("auth");
    });
});
<?php

use App\Http\Controllers\RoUnitController;
use Illuminate\Support\Facades\Route;

Route::prefix('ro-units')->group(function () {
    Route::controller(RoUnitController::class)->group(function () {
        Route::get('/', 'ro_units_page')->name('ro_units.page');
        Route::post('/store', 'store')->name('ro_units.store');
        Route::put('/{roUnit}', 'update')->name('ro_units.update');
        Route::delete('/{roUnit}', 'destroy')->name('ro_units.destroy');
    });
});

<?php

use App\Http\Controllers\ReadingCategoryController;
use App\Http\Controllers\RoUnitController;
use Illuminate\Support\Facades\Route;

Route::prefix('ro-units')->group(function () {
    Route::controller(RoUnitController::class)->group(function () {
        Route::get('/', 'ro_units_page')->name('ro_units.page')->middleware("auth");
        Route::get('/unit-details/{id}', 'ro_unit_details')->name('ro_units.details')->middleware("auth");
        Route::get('/settings', 'ro_units_settings_page')->name('ro_units.settings.page')->middleware("auth");
        Route::post('/store', 'store')->name('ro_units.store')->middleware("auth");
        Route::put('/{roUnit}', 'update')->name('ro_units.update')->middleware("auth");
        Route::delete('/{roUnit}', 'destroy')->name('ro_units.destroy')->middleware("auth");

        // Assign / Unassign categories to an RO unit
        Route::post('/{roUnit}/assign-category', [ReadingCategoryController::class, 'assign'])->name('ro_units.assign_category')->middleware("auth");
        Route::post('/{roUnit}/unassign-category', [ReadingCategoryController::class, 'unassign'])->name('ro_units.unassign_category')->middleware("auth");
    });
});

// Reading categories & parameters (company-level)
Route::prefix('reading-categories')->controller(ReadingCategoryController::class)->group(function () {
    Route::post('/', 'store')->name('reading_categories.store')->middleware("auth");
    Route::put('/{category}', 'update')->name('reading_categories.update')->middleware("auth");
    Route::delete('/{category}', 'destroy')->name('reading_categories.destroy')->middleware("auth");

    // Parameters nested under a category
    Route::post('/{category}/parameters', 'storeParameter')->name('reading_categories.parameters.store')->middleware("auth");
    Route::put('/parameters/{parameter}', 'updateParameter')->name('reading_categories.parameters.update')->middleware("auth");
    Route::delete('/parameters/{parameter}', 'destroyParameter')->name('reading_categories.parameters.destroy')->middleware("auth");





    Route::post('/ro-units/{roUnit}/toggle-parameter','toggleParameter');
});
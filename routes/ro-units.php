<?php

use App\Http\Controllers\ReadingCategoryController;
use App\Http\Controllers\RoUnitController;
use Illuminate\Support\Facades\Route;

Route::prefix('ro-units')->group(function () {
    Route::controller(RoUnitController::class)->group(function () {
        Route::get('/', 'ro_units_page')->name('ro_units.page');
        Route::get('/settings', 'ro_units_settings_page')->name('ro_units.settings.page');
        Route::post('/store', 'store')->name('ro_units.store');
        Route::put('/{roUnit}', 'update')->name('ro_units.update');
        Route::delete('/{roUnit}', 'destroy')->name('ro_units.destroy');

        // Assign / Unassign categories to an RO unit
        Route::post('/{roUnit}/assign-category', [ReadingCategoryController::class, 'assign'])->name('ro_units.assign_category');
        Route::post('/{roUnit}/unassign-category', [ReadingCategoryController::class, 'unassign'])->name('ro_units.unassign_category');
    });
});

// Reading categories & parameters (company-level)
Route::prefix('reading-categories')->controller(ReadingCategoryController::class)->group(function () {
    Route::post('/', 'store')->name('reading_categories.store');
    Route::put('/{category}', 'update')->name('reading_categories.update');
    Route::delete('/{category}', 'destroy')->name('reading_categories.destroy');

    // Parameters nested under a category
    Route::post('/{category}/parameters', 'storeParameter')->name('reading_categories.parameters.store');
    Route::put('/parameters/{parameter}', 'updateParameter')->name('reading_categories.parameters.update');
    Route::delete('/parameters/{parameter}', 'destroyParameter')->name('reading_categories.parameters.destroy');
});

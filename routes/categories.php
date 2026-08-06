<?php

use App\Http\Controllers\CategoriesController;
use Illuminate\Support\Facades\Route;

Route::prefix('categories')->middleware("auth")->group(function () {
    Route::controller(CategoriesController::class)->group(function () {
        Route::get('/', 'categories_page')->name('categories.page');
        Route::post('/', 'storeCategory')->name('categories.store');
        Route::put('/{category}', 'updateCategory')->name('categories.update');
        Route::delete('/{category}', 'destroyCategory')->name('categories.destroy');

        Route::post('/{category}/parameters', 'storeParameter')->name('categories.parameters.store');
        Route::put('/parameters/{parameter}', 'updateParameter')->name('categories.parameters.update');
        Route::delete('/parameters/{parameter}', 'destroyParameter')->name('categories.parameters.destroy');
    });
});
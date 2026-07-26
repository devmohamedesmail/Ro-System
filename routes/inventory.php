<?php

use App\Http\Controllers\InventoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('inventories')->group(function () {
    Route::controller(InventoryController::class)->group(function () {
        Route::get('/', 'inventory_page')->name('inventory.page')->middleware("auth");
        Route::post('/store', 'store_inventory')->name('inventory.store')->middleware("auth");
       
    });
});
<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;


Route::prefix("companies")->group(function () {
    Route::controller(CompanyController::class)->group(function () {
        Route::post("/create", 'store')->name('companies.store');
        Route::get("/register/page", 'create_page')->name('companies.register.page');
    });
});
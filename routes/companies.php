<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;

Route::prefix('companies')->group(function () {
    Route::controller(CompanyController::class)->group(function () {
        Route::post('/store', 'store')->name('companies.store')->middleware("auth");
        Route::get('/register/page', 'create_page')->name('companies.register.page')->middleware("auth");
        Route::get('/dashboard', 'dashboard')->name('companies.dashboard')->middleware("auth");
        // Route::get('/dashboard/summary', 'summary')->name('companies.dashboard.summary')->middleware("auth");
    });
});
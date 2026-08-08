<?php

use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::prefix('reports')->group(function () {
    Route::controller(ReportController::class)->group(function () {
        Route::get('/', 'reports_page')->name('reports.page')->middleware('auth');
        Route::post('/', 'store')->name('reports.store')->middleware('auth');
        Route::get('/ro-unit/{id}', 'show_ro_unit_reports')->name('unit.ro.reports')->middleware('auth');
    });
});
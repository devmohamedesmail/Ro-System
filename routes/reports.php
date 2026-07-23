<?php

use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::prefix('reports')->group(function () {
    Route::controller(ReportController::class)->group(function () {
        Route::get('/', 'reports_page')->name('reports.page');

    });
});

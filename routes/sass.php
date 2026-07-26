<?php

use App\Http\Controllers\SassSettingController;
use Illuminate\Support\Facades\Route;


Route::controller(SassSettingController::class)->group(function () {
    Route::get('/sass-update',  'sass_update')->middleware("auth");
    Route::post('/sass-update/confirm',   'update')->name('sass.update')->middleware("auth");
});
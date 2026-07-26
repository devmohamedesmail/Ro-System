<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
    Route::controller(UsersController::class)->group(function () {
        Route::get('/', 'users_page')->name('users.page')->middleware("auth");
        Route::get('/auth/settings', 'user_setting')->name('users.page')->middleware("auth");
        Route::post('/store', 'store')->name('users.store')->middleware("auth");
        Route::put('/{user}', 'update')->name('users.update')->middleware("auth");
        Route::delete('/{user}', 'destroy')->name('users.destroy')->middleware("auth");
    });
});
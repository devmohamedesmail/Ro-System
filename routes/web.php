<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'index')->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/redirect.php';
require __DIR__.'/settings.php';
require __DIR__.'/companies.php';
require __DIR__.'/stations.php';
require __DIR__.'/ro-units.php';
require __DIR__.'/users.php';
require __DIR__.'/readings.php';
require __DIR__.'/reports.php';
require __DIR__.'/inventory.php';
require __DIR__.'/sass.php';
require __DIR__.'/categories.php';
require __DIR__.'/activity.php';
require __DIR__.'/mif.php';
require __DIR__.'/mrf.php';
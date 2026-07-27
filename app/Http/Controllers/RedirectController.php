<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class RedirectController extends Controller
{
    public function dashboard()
    {
        // return Inertia::render('dashboard/index');
        return redirect('/companies/dashboard');
    }
}

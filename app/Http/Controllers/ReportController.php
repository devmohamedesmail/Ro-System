<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ReportController extends Controller
{
    public function reports_page()
    {
        return Inertia::render('reports/index');
    }
}

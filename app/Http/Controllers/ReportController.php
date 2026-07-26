<?php

namespace App\Http\Controllers;

use App\Models\RoUnit;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function reports_page()
    {
        // $user = Auth::user();
        // $ro_units = RoUnit::where('user_id', $user->id)->get();
        $stations = Auth::user()->stations()->with('roUnits')->get();
        return Inertia::render('reports/index' , ['stations' => $stations]);
    }
}
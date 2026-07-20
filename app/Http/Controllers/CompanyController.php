<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
   public function create_page(){
    return Inertia::render('companies/create');
   }
}
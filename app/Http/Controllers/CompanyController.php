<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyRequest;
use App\Services\CompanyService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function __construct(protected CompanyService $companyService) {}

    public function create_page()
    {
        return Inertia::render('companies/create');
    }

    public function store(StoreCompanyRequest $request)
    {
        $company = $this->companyService->createCompany($request);
        return redirect()->route("companies.dashboard");
    }

    public function dashboard()
    { 
         $stations = Auth::user()->stations()->with('roUnits')->get();
         return Inertia::render('dashboard/index',['stations'=> $stations]);
    }

    
}
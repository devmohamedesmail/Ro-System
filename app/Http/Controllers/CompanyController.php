<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyRequest;
use App\Services\CompanyService;
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

        return redirect()->back();
    }

    public function dashboard()
    {
        return Inertia::render('dashboard/index');
    }
}

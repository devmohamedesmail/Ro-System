<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreROunitRequest;
use App\Http\Requests\UpdateROunitRequest;
use App\Models\RoUnit;
use App\Services\CompanyService;
use App\Services\ReadingCategoryService;
use App\Services\RoUnitService;
use App\Services\StationService;
use Inertia\Inertia;

class RoUnitController extends Controller
{
    public function __construct(
        protected RoUnitService $roUnitService,
        protected ReadingCategoryService $readingCategoryService,
        protected StationService $stationService,
        protected CompanyService $companyService
    ) {}

    public function ro_units_page()
    {
        $stations = $this->stationService->getCompanyStations();  
        $roUnits = RoUnit::with('station:id,name,code')
            ->whereIn('station_id', $stations->pluck('id'))
            ->orderBy('created_at', 'desc')
            ->get();          
        return Inertia::render('ro-units/index', [
            'ro_units' => $roUnits,
            'stations' => $stations,
        ]);
    }

    public function ro_units_settings_page()
    {
        
        $company = $this->companyService->getAuthCompany();
        $stations = $company->stations()->with(['roUnits.readingCategories','roUnits.readingCategories.parameters', 'roUnits.readingParameters'])->get();
   
        $categories = $this->readingCategoryService->getCompanyCategories($company->id);
        return Inertia::render('ro-units/ro-settings', [
            'stations'=>$stations,
            'categories' => $categories,
        ]);
    }

    public function store(StoreROunitRequest $request)
    {
        $this->roUnitService->store($request);
        return redirect()->back();
    }

    public function update(UpdateROunitRequest $request, RoUnit $roUnit)
    {
        $this->roUnitService->update($request, $roUnit);
        return redirect()->back();
    }

    public function destroy(RoUnit $roUnit)
    {
        $this->roUnitService->destroy($roUnit);
        return redirect()->back();
    }


   public function ro_unit_details($id){
    $ro_unit = RoUnit::with(['station:id,name,code', 'readingCategories.parameters'])->findOrFail($id);
    return Inertia::render('ro-units/show', ['ro_unit'=>$ro_unit]);
   }
}
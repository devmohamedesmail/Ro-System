<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreROunitRequest;
use App\Http\Requests\UpdateROunitRequest;
use App\Models\RoUnit;
use App\Models\Station;
use App\Services\ReadingCategoryService;
use App\Services\RoUnitService;
use Inertia\Inertia;

class RoUnitController extends Controller
{
    public function __construct(
        protected RoUnitService $roUnitService,
        protected ReadingCategoryService $categoryService
    ) {}

    public function ro_units_page()
    {
        $stations = Station::where('company_id', auth()->user()?->company_id ?? 1)
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code']);

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
        $companyId = auth()->user()?->company_id ?? 1;

        $stations = Station::where('company_id', $companyId)
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code']);

        $roUnits = RoUnit::with([
            'readingCategories.parameters' => fn ($q) => $q->orderBy('order'),
        ])
            ->whereIn('station_id', $stations->pluck('id'))
            ->orderBy('name')
            ->get(['id', 'name', 'code', 'station_id']);

        $categories = $this->categoryService->getCompanyCategories($companyId);

        return Inertia::render('ro-units/ro-settings', [
            'ro_units' => $roUnits,
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
}

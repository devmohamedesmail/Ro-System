<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStationRequest;
use App\Http\Requests\UpdateStationRequest;
use App\Models\Station;
use App\Services\StationService;
use Inertia\Inertia;

class StationController extends Controller
{
    public function __construct(protected StationService $stationService) {}

    public function stations_page()
    {
        $stations = Station::where('company_id', auth()->user()?->company_id ?? 1)
            ->withCount('roUnits')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('stations/index', [
            'stations' => $stations,
        ]);
    }

    public function store(StoreStationRequest $request)
    {
        $this->stationService->storeStation($request);

        return redirect()->back();
    }

    public function update(UpdateStationRequest $request, Station $station)
    {
        $this->stationService->updateStation($request, $station);

        return redirect()->back();
    }

    public function destroy(Station $station)
    {
        $this->stationService->destroyStation($station);

        return redirect()->back();
    }
}

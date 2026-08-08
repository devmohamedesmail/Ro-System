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
        return Inertia::render('stations/index', [
            'stations' => $this->stationService->getCompanyStations(),
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


    public function station_operators(){
        
        return Inertia::render('stations/operators',[
            'operators'=>$this->stationService->getAuthStationsOperators()
        ]);
    }
}
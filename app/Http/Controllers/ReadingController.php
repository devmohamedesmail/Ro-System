<?php

namespace App\Http\Controllers;

use App\Services\StationService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReadingController extends Controller
{
    public function __construct(protected StationService $stationService){}

    
    public function readings_page(){
         $stations = Auth::user()->stations()->with('roUnits.readingCategories.parameters')->get();
       return Inertia::render("readings/index",[
        // "stations"=> $this->stationService->getAuthStations()
        "stations"=> $stations
       ]);
    }
}
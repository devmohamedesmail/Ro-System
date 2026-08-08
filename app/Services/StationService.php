<?php

namespace App\Services;

use App\Http\Requests\StoreStationRequest;
use App\Http\Requests\UpdateStationRequest;
use App\Models\Company;
use App\Models\Station;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StationService
{


    public function getCompanyStations(){
         $stations = Station::where('company_id', auth()->user()?->company_id ?? 1)
            ->withCount('roUnits')
            ->orderBy('created_at', 'desc')
            ->get();

        return $stations;    
    }


    public function getAuthStations(){
        $stations = Auth::user()->stations()->with('roUnits.readingCategories.parameters')->get();
        return $stations;
    }

    public function getAuthStationsWithInventory(){
        return Auth::user()->stations()->with(['inventory.items', 'roUnits'])->get();
    }
    
    public function StoreStation(StoreStationRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $companyId = Auth::user()?->company_id ?? 1;
            $company = Company::findOrFail($companyId);
            $station = new Station;
            $station->company_id = $companyId;
            $station->name = $request->name;
            $station->code = $this->generateStationCode($company);
            $station->slug = $this->generateSlug($request->name);
            $station->phone = $request->phone;
            $station->city = $request->city;
            $station->address = $request->address;
            $station->save();



            $station->inventory()->create([
                'company_id' => $companyId,
                'name' => $station->name . ' Inventory / مخزون',
                'description' => 'Default inventory for ' . $station->name,
            ]);

            return $station;
        });
    }

    public function updateStation(UpdateStationRequest $request, Station $station): Station
    {
        $station->fill($request->only(['name', 'phone', 'city', 'country', 'address', 'lat', 'lng']));
        if ($request->has('is_active')) {
            $station->is_active = $request->boolean('is_active');
        }
        $station->save();

        return $station;
    }

    public function destroyStation(Station $station): void
    {
        $station->delete();
    }



    public function getAuthStationsOperators(){
        $operators = Auth::user()->stations()->with('users')->get();
        return $operators;
    }

    private function generateSlug(string $name): string
    {
        $slug = Str::slug($name);

        $originalSlug = $slug;
        $counter = 1;

        while (Station::where('slug', $slug)->exists()) {

            $slug = $originalSlug . '-' . $counter;

            $counter++;
        }

        return $slug;
    }

    private function generateStationCode(Company $company): string
    {
        // Get first letters from company name
        $prefix = collect(explode(' ', $company->name))
            ->map(fn($word) => strtoupper(substr($word, 0, 1)))
            ->join('');

        // Get last station number
        $lastStation = Station::where('company_id', $company->id)
            ->latest('id')
            ->first();

        $number = $lastStation
            ? ((int) substr($lastStation->code, strlen($prefix) + 1)) + 1
            : 1;

        return $prefix . '-' . str_pad($number, 3, '0', STR_PAD_LEFT);
    }
}
<?php

namespace App\Services;

use App\Http\Requests\StoreROunitRequest;
use App\Http\Requests\UpdateROunitRequest;
use App\Models\RoUnit;
use App\Models\Station;
use Illuminate\Support\Facades\Auth;

class RoUnitService
{
    public function store(StoreROunitRequest $request): RoUnit
    {
        $companyId = Auth::user()?->company_id ?? 1;
        $unit = new RoUnit;
        $unit->company_id = $companyId;
        $unit->station_id = $request->station_id;
        $unit->name = $request->name;
        $unit->code = $request->code ?? $this->generateCode($request->station_id);
        $unit->capacity = $request->capacity;
        $unit->description = $request->description;
        $unit->serial_number = $request->serial_number;
        $unit->manufacturer = $request->manufacturer;
        $unit->is_active = $request->boolean('is_active', true);
        $unit->save();
        return $unit;
    }

    public function update(UpdateROunitRequest $request, RoUnit $roUnit): RoUnit
    {
        $roUnit->fill($request->only([
            'station_id',
            'name',
            'code',
            'capacity',
            'description',
            'serial_number',
            'manufacturer',
        ]));

        if ($request->has('is_active')) {
            $roUnit->is_active = $request->boolean('is_active');
        }

        $roUnit->save();

        return $roUnit;
    }

    public function destroy(RoUnit $roUnit): void
    {
        $roUnit->delete();
    }

    private function generateCode(int $stationId): string
    {
        $station = Station::find($stationId);
        $prefix = $station
            ? strtoupper(substr(preg_replace('/[^A-Za-z]/', '', $station->name), 0, 3))
            : 'RO';

        $last = RoUnit::where('station_id', $stationId)->latest('id')->first();
        $number = $last
            ? ((int) substr($last->code, strlen($prefix) + 1)) + 1
            : 1;

        return $prefix.'-'.str_pad($number, 3, '0', STR_PAD_LEFT);
    }
}
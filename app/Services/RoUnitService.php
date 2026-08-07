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
        $data = $request->validated();
        $data['company_id'] = $companyId;
        if (empty($data['code'])) {
            $data['code'] = $this->generateCode($request->station_id);
        }
        if (!isset($data['is_active'])) {
            $data['is_active'] = true;
        }

        return RoUnit::create($data);
    }

    public function update(UpdateROunitRequest $request, RoUnit $roUnit): RoUnit
    {
        $data = $request->validated();
        $roUnit->update($data);

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
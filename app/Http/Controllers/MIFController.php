<?php

namespace App\Http\Controllers;

use App\Services\MIFService;
use App\Services\StationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MIFController extends Controller
{
    public function __construct(
        protected StationService $stationService,
        protected MIFService $mifService
    ) {}

    public function mif_page()
    {
        $user = Auth::user();
        $company = $user?->company;
        $users = $company ? $company->users()->select('id', 'name', 'email')->get() : [];

        return Inertia::render("mif/index", [
            "stations" => $this->stationService->getAuthStationsWithInventory(),
            "forms" => $this->mifService->getMaterialIssuingForms(),
            "users" => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'form_number' => 'nullable|string|max:255',
            'station_id' => 'required|exists:stations,id',
            'from_location' => 'nullable|string|max:255',
            'store_location' => 'nullable|string|max:255',
            'from_date' => 'nullable|date',
            'to_date' => 'nullable|date',
            'is_transfer' => 'nullable|boolean',
            'is_maintenance_direct_issue' => 'nullable|boolean',
            'remarks' => 'nullable|string',
            'issued_by' => 'nullable|exists:users,id',
            'recieved_by' => 'nullable|exists:users,id',
            'items' => 'required|array|min:1',
            'items.*.inventory_item_id' => 'required|exists:inventory_items,id',
            'items.*.quantity' => 'required|numeric|min:0.001',
            'items.*.pm_order' => 'nullable|string|max:255',
            'items.*.valuation_type' => 'nullable|string|max:255',
        ]);

        $this->mifService->storeMIF($request);

        return redirect()->route('mif.page')->with('success', 'Material Issuing Form (MIF) created successfully.');
    }
}
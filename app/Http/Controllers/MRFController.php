<?php

namespace App\Http\Controllers;

use App\Services\MRFService;
use App\Services\StationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MRFController extends Controller
{
    public function __construct(
        protected StationService $stationService,
        protected MRFService $mrfService
    ) {}

    public function mrf_page()
    {
        $user = Auth::user();
        $company = $user?->company;
        $users = $company ? $company->users()->select('id', 'name', 'email')->get() : [];

        return Inertia::render("mrf/index", [
            "stations" => $this->stationService->getAuthStationsWithInventory(),
            "forms" => $this->mrfService->getMaterialReceivingForms(),
            "users" => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'form_number' => 'nullable|string|max:255',
            'station_id' => 'required|exists:stations,id',
            'location' => 'nullable|string|max:255',
            'from_plant' => 'nullable|string|max:255',
            'store_location' => 'nullable|string|max:255',
            'from_date' => 'nullable|date',
            'to_date' => 'nullable|date',
            'remarks' => 'nullable|string',
            'received_by' => 'nullable|exists:users,id',
            'reviewed_by' => 'nullable|exists:users,id',
            'requested_by' => 'nullable|exists:users,id',
            'approved_by' => 'nullable|exists:users,id',
            'operator' => 'nullable|string|max:255',
            'area_supervisor' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'department_head' => 'nullable|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.inventory_item_id' => 'required|exists:inventory_items,id',
            'items.*.quantity' => 'required|numeric|min:0.001',
            'items.*.part_serial_number' => 'nullable|string|max:255',
            'items.*.valuation_type' => 'nullable|string|max:255',
            'items.*.bin_location' => 'nullable|string|max:255',
            'items.*.sto_pro_no' => 'nullable|string|max:255',
            'items.*.invoice_no' => 'nullable|string|max:255',
        ]);

        $this->mrfService->storeMRF($request);

        return redirect()->route('mrf.page')->with('success', 'Material Receiving Form (MRF) created successfully.');
    }
}
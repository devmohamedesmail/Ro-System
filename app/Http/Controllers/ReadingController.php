<?php

namespace App\Http\Controllers;

use App\Models\ReadingSession;
use App\Models\RoUnit;
use App\Models\Station;
use App\Services\ReadingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReadingController extends Controller
{
    public function __construct(protected ReadingService $readingService) {}

    // ─── List all sessions ────────────────────────────────────────────────

    public function readings_page(Request $request)
    {
        $stations = Auth::user()->stations()->with('roUnits.readingCategories.parameters')->get();
        return Inertia::render('readings/index', [
            'stations' => $stations,
        ]);
    }

    // ─── Create form ──────────────────────────────────────────────────────

    public function create_page(Request $request)
    {
        $companyId = Auth::user()?->company_id ?? 1;

        $stations = Station::where('company_id', $companyId)
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code']);

        $roUnits = RoUnit::with([
            'readingCategories' => fn ($q) => $q->wherePivot('is_active', true),
            'readingCategories.parameters' => fn ($q) => $q->where('is_active', true)->orderBy('order'),
            'lastReadingSession',
        ])
            ->whereIn('station_id', $stations->pluck('id'))
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code', 'station_id']);

        // Compute next-allowed-at per unit
        $roUnitsWithStatus = $roUnits->map(function (RoUnit $unit) {
            $nextAt = $this->readingService->nextAllowedAt($unit);

            return [
                'id' => $unit->id,
                'name' => $unit->name,
                'code' => $unit->code,
                'station_id' => $unit->station_id,
                'next_allowed_at' => $nextAt?->toIso8601String(),
                'reading_categories' => $unit->readingCategories,
            ];
        });

        $selectedUnitId = $request->integer('ro_unit_id') ?: ($roUnits->first()?->id);

        return Inertia::render('readings/create', [
            'ro_units' => $roUnitsWithStatus,
            'selected_unit_id' => $selectedUnitId,
        ]);
    }

    // ─── Store ────────────────────────────────────────────────────────────

    public function store(Request $request)
    {
        $request->validate([
            'ro_unit_id' => 'required|exists:ro_units,id',
            'notes' => 'nullable|string',
            'values' => 'required|array',
            'values.*' => 'nullable|numeric',
        ]);

        $roUnit = RoUnit::findOrFail($request->ro_unit_id);

        try {
            $this->readingService->store($request, $roUnit);
        } catch (\RuntimeException $e) {
            return back()->withErrors(['reading_at' => $e->getMessage()]);
        }

        return redirect()->route('readings.page')
            ->with('success', 'Reading submitted successfully.');
    }



   public function ro_unit_readings_page($id)
{
    $roUnit = RoUnit::with([
        'readingCategories.parameters.readingValues'
    ])->findOrFail($id);

    return Inertia::render('readings/ro-unit-readings', [
        'ro_unit' => $roUnit,
    ]);
}
}
<?php

namespace App\Http\Controllers;

use App\Models\DailyReport;
use App\Models\DailyReportValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function reports_page()
    {
        $stations = Auth::user()->stations()->with('roUnits.readingCategories.parameters')->get();
        return Inertia::render('reports/index', ['stations' => $stations]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ro_unit_id' => 'required|exists:ro_units,id',
            'report_date' => 'required|date',
            'actions' => 'nullable|string',
            'recommendations' => 'nullable|string',
            'values' => 'nullable|array',
            'values.*.previous_value' => 'nullable|numeric',
            'values.*.current_value' => 'nullable|numeric',
            'values.*.difference' => 'nullable|numeric',
        ]);

        $report = DailyReport::updateOrCreate(
            [
                'ro_unit_id' => $request->ro_unit_id,
                'report_date' => $request->report_date,
            ],
            [
                'user_id' => Auth::id(),
                'actions' => $request->actions,
                'recommendations' => $request->recommendations,
            ]
        );

        foreach ($request->values ?? [] as $parameterId => $entry) {
            $prev = isset($entry['previous_value']) && $entry['previous_value'] !== '' ? (float) $entry['previous_value'] : null;
            $curr = isset($entry['current_value']) && $entry['current_value'] !== '' ? (float) $entry['current_value'] : null;
            $diff = $prev !== null && $curr !== null ? round($curr - $prev, 3) : null;

            DailyReportValue::updateOrCreate(
                [
                    'daily_report_id' => $report->id,
                    'reading_parameter_id' => (int) $parameterId,
                ],
                [
                    'previous_value' => $prev,
                    'current_value' => $curr,
                    'difference' => $diff,
                ]
            );
        }

        return redirect()->route('reports.page')
            ->with('success', 'Daily report submitted successfully.');
    }
}
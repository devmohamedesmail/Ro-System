<?php

namespace App\Http\Controllers;

use App\Models\DailyReport;
use App\Models\DailyReportValue;
use App\Models\RoUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function reports_page()
    {
        // $stations = Auth::user()->stations()->with('roUnits.readingCategories.parameters')->get();
        $stations = Auth::user()->stations()->with([
        'roUnits.roUnitReadingCategories.category',
        'roUnits.roUnitReadingCategories.parameters.parameter',
    ])->get();
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
                    'ro_unit_reading_parameter_id' => (int) $parameterId,
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


   

    public function show_ro_unit_reports(Request $request, $id)
{
    $roUnit = RoUnit::findOrFail($id);

    $query = DailyReport::query()
        ->where('ro_unit_id', $id)
        ->with([
            'values.roUnitReadingParameter.parameter',
            'values.roUnitReadingParameter.category.category',
        ])
        ->latest('report_date');

    if ($request->filled('date_from')) {
        $query->whereDate(
            'report_date',
            '>=',
            $request->date_from
        );
    }

    if ($request->filled('date_to')) {
        $query->whereDate(
            'report_date',
            '<=',
            $request->date_to
        );
    }

    $reports = $query
        ->paginate(10)
        ->withQueryString();

    $reports->getCollection()->transform(function ($report) {

        return [
            'id' => $report->id,
            'report_date' => $report->report_date,
            'actions' => $report->actions,
            'recommendations' => $report->recommendations,

            'categories' => $report->values
                ->groupBy(
                    fn ($value) =>
                        $value->roUnitReadingParameter
                            ?->ro_unit_reading_category_id
                )
                ->map(function ($values) {

                    $roUnitParameter =
                        $values->first()
                            ->roUnitReadingParameter;

                    $roUnitCategory =
                        $roUnitParameter?->category;

                    $category =
                        $roUnitCategory?->category;

                    return [
                        'id' => $category?->id,
                        'name' => $category?->name,

                        'parameters' => $values
                            ->sortBy(
                                fn ($value) =>
                                    $value
                                        ->roUnitReadingParameter
                                        ?->order
                            )
                            ->map(function ($value) {

                                $parameter =
                                    $value
                                        ->roUnitReadingParameter;

                                return [
                                    // IMPORTANT:
                                    // This is ro_unit_reading_parameters.id
                                    'id' => $parameter?->id,

                                    // Global parameter ID
                                    'reading_parameter_id' =>
                                        $parameter
                                            ?->reading_parameter_id,

                                    'name' =>
                                        $parameter?->name,

                                    'code' =>
                                        $parameter?->code,

                                    'unit' =>
                                        $parameter?->unit,

                                    'previous_value' =>
                                        $value->previous_value,

                                    'current_value' =>
                                        $value->current_value,

                                    'difference' =>
                                        $value->difference,
                                ];
                            })
                            ->values(),
                    ];
                })
                ->values(),
        ];
    });

    return Inertia::render('reports/show', [
        'roUnit' => $roUnit,

        'reports' => $reports,

        'filters' => [
            'date_from' => $request->date_from,
            'date_to' => $request->date_to,
        ],
    ]);
}
}
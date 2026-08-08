<?php

namespace App\Http\Controllers;

use App\Models\ReadingSession;
use App\Models\ReadingValue;
use App\Models\RoUnit;
use App\Services\StationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReadingController extends Controller
{
    public function __construct(protected StationService $stationService){}

    
    public function readings_page(){
    $stations = Auth::user()->stations()->with([
        'roUnits.roUnitReadingCategories.category',
        'roUnits.roUnitReadingCategories.parameters.parameter',
    ])->get();
  
       return Inertia::render("readings/index",[
        "stations"=> $stations
       ]);
    }



    public function store(Request $request){
        DB::transaction(function()use($request){
            $session=ReadingSession::create([
               'ro_unit_id'=>$request->ro_unit_id ,
               'user_id'=>Auth::user()->id,
               'notes'=>$request->notes,
               'reading_at'=>now()
            ]);
            $values=[];
            foreach($request->values as $parameterId => $value){
                $values[]=[
                    'reading_session_id'=>$session->id,
                    'ro_unit_reading_parameter_id'=>$parameterId,
                    'value'=>$value,
                ];
                
            }
            ReadingValue::insert($values);
            return redirect()->back();
        });
    }



    public function ro_unit_readings_pagee($id){
        // $readings=ReadingSession::query()->where('ro_unit_id',$id)->with([
        //    'readingValues.parameter'
        // ])->latest('reading_at')->paginate(10);
        // return $readings;
        $roUnit=RoUnit::findOrFail($id);
        $sessions= ReadingSession::where('ro_unit_id',$id)->with(['readingValues.parameter'])->latest()->paginate(10);

        
        return Inertia::render("readings/ro-unit-readings",[
            'roUnit'=>$roUnit,
            'sessions'=>$sessions,
        ]);
    }





//  public function ro_unit_readings_page($id)
// {
//     $roUnit = RoUnit::with([
//         'readingCategories.parameters.readingValues'
//     ])->findOrFail($id);
//         if ($request->filled('date_from')) {
//             $query->whereDate('reading_at', '>=', $request->date_from);
//         }

//         if ($request->filled('date_to')) {
//             $query->whereDate('reading_at', '<=', $request->date_to);
//         }

//     return Inertia::render('readings/ro-unit-readings', [
//         'ro_unit' => $roUnit,
//     ]);
//         $sessions = $query->paginate(10)->withQueryString();

//         $sessions->getCollection()->transform(function ($session) {
//             return [
//                 'id' => $session->id,
//                 'ro_unit_id' => $session->ro_unit_id,
//                 'reading_at' => $session->reading_at,
//                 'categories' => $session->readingValues
//                     ->groupBy(fn ($v) => $v->parameter->category_id)
//                     ->map(function ($values) {
//                         $category = $values->first()->parameter->category;

//                         return [
//                             'id' => $category->id,
//                             'name' => $category->name,
//                             'parameters' => $values->map(fn ($v) => [
//                                 'id' => $v->parameter->id,
//                                 'name' => $v->parameter->name,
//                                 'value' => $v->value,
//                                 'unit' => $v->parameter->unit,
//                             ])->values(),
//                         ];
//                     })
//                     ->values(),
//             ];
//         });

//         return Inertia::render('readings/ro-unit-readings', [
//             'roUnit' => $roUnit,
//             'sessions' => $sessions,
//             'filters' => [
//                 'date_from' => $request->date_from,
//                 'date_to' => $request->date_to,
//             ],
//         ]);
//     }


public function ro_unit_readings_page(Request $request, $id)
{
    $roUnit = RoUnit::findOrFail($id);

    $query = ReadingSession::query()
        ->where('ro_unit_id', $id)
        ->with([
            'readingValues.roUnitReadingParameter.category.readingCategory',
            'readingValues.roUnitReadingParameter.readingParameter',
        ])
        ->latest('reading_at');

    if ($request->filled('date_from')) {
        $query->whereDate('reading_at', '>=', $request->date_from);
    }

    if ($request->filled('date_to')) {
        $query->whereDate('reading_at', '<=', $request->date_to);
    }

    $sessions = $query->paginate(10)->withQueryString();

    $sessions->getCollection()->transform(function ($session) {

        return [
            'id' => $session->id,
            'ro_unit_id' => $session->ro_unit_id,
            'reading_at' => $session->reading_at,
            'notes' => $session->notes,

            'categories' => $session->readingValues
                ->groupBy(function ($value) {
                    return $value->roUnitReadingParameter
                        ->category
                        ->id;
                })
                ->map(function ($values) {

                    $categoryPivot = $values->first()
                        ->roUnitReadingParameter
                        ->category;

                    $category = $categoryPivot->readingCategory;

                    return [
                        'id' => $category->id,
                        'name' => $category->name,

                        'parameters' => $values
                            ->sortBy(fn ($v) => $v->roUnitReadingParameter->order)
                            ->map(function ($value) {

                                $parameter = $value->roUnitReadingParameter;

                                return [
                                    'id' => $parameter->id,
                                    'reading_parameter_id' => $parameter->reading_parameter_id,

                                    'name' => $parameter->display_name
                                        ?: $parameter->name,

                                    'code' => $parameter->code,
                                    'unit' => $parameter->unit,

                                    'value' => $value->value,
                                    'notes' => $value->notes,

                                    'min_value' => $parameter->min_value,
                                    'max_value' => $parameter->max_value,
                                    'alarm_low' => $parameter->alarm_low,
                                    'alarm_high' => $parameter->alarm_high,

                                    'input_type' => $parameter->input_type,
                                    'usage' => $parameter->usage,
                                    'track_difference' => $parameter->track_difference,
                                    'is_required' => $parameter->is_required,
                                ];
                            })
                            ->values(),
                    ];
                })
                ->sortBy('id')
                ->values(),
        ];
    });

    return Inertia::render('readings/ro-unit-readings', [
        'roUnit' => $roUnit,
        'sessions' => $sessions,
        'filters' => [
            'date_from' => $request->date_from,
            'date_to' => $request->date_to,
        ],
    ]);
}








    
}
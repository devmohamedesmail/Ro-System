<?php

namespace App\Http\Controllers;

use App\Models\ReadingCategory;
use App\Models\ReadingParameter;
use App\Models\RoUnit;
use App\Models\RoUnitReadingParameter;
use App\Services\ReadingCategoryService;
use Illuminate\Http\Request;

class ReadingCategoryController extends Controller
{
    public function __construct(protected ReadingCategoryService $service) {}

    // ─── Categories ──────────────────────────────────────────────────────

    public function store(Request $request)
    {
        $companyId = auth()->user()?->company_id ?? 1;
        $this->service->storeCategory($request, $companyId);

        return redirect()->back();
    }

    public function update(Request $request, ReadingCategory $category)
    {
        $this->service->updateCategory($request, $category);

        return redirect()->back();
    }

    public function destroy(ReadingCategory $category)
    {
        $this->service->deleteCategory($category);

        return redirect()->back();
    }

    // ─── Assign / Unassign ────────────────────────────────────────────────

    public function assign(Request $request, RoUnit $roUnit)
    {
        
        $request->validate(['reading_category_id' => 'required|exists:reading_categories,id']);
        $this->service->assignCategory($roUnit, $request->reading_category_id);
        return redirect()->back();
    }

    public function unassign(Request $request, RoUnit $roUnit)
    {
        $request->validate(['reading_category_id' => 'required|exists:reading_categories,id']);
        $this->service->unassignCategory($roUnit, $request->reading_category_id);
        return redirect()->back();
    }

    // ─── Parameters ──────────────────────────────────────────────────────

    public function storeParameter(Request $request, ReadingCategory $category)
    {
        $this->service->storeParameter($request, $category);

        return redirect()->back();
    }

    public function updateParameter(Request $request, ReadingParameter $parameter)
    {
        $this->service->updateParameter($request, $parameter);

        return redirect()->back();
    }

    public function destroyParameter(ReadingParameter $parameter)
    {
        $this->service->deleteParameter($parameter);

        return redirect()->back();
    }




public function toggleParameter(Request $request, RoUnit $roUnit)
{


// dd($roUnit->id,$request->parameter_id);

// dd($request);
$exist = RoUnitReadingParameter::where('ro_unit_id', $roUnit->id)
->where('reading_parameter_id', $request->parameter_id)->first();

if($exist){
   
    $exist->delete();
    return redirect()->back();
}else{
    $validated = $request->validate([
        'ro_unit_reading_category_id'=>'nullable',
        'parameter_id' => 'required|exists:reading_parameters,id',
        'assigned' => 'required|boolean',
    ]);

    

      $parameter = ReadingParameter::findOrFail(
        $validated['parameter_id']
    );

     if ($validated['assigned']) {


        $roUnitParamter = new RoUnitReadingParameter();
     
           $roUnitParamter->reading_parameter_id = $parameter->id;
           $roUnitParamter->ro_unit_id = $roUnit->id;
           $roUnitParamter->ro_unit_reading_category_id = $request->ro_unit_reading_category_id;
            $roUnitParamter->name = $parameter->name;
            $roUnitParamter->display_name = $parameter->display_name;
            $roUnitParamter->code = $parameter->code;
            $roUnitParamter->unit = $parameter->unit;
            $roUnitParamter->input_type = $parameter->input_type;
            $roUnitParamter->usage = $parameter->usage;
            $roUnitParamter->track_difference = $parameter->track_difference;
            $roUnitParamter->min_value = $parameter->min_value;
            $roUnitParamter->max_value = $parameter->max_value;
            $roUnitParamter->is_required = $parameter->is_required;
            $roUnitParamter->is_active = true;
            $roUnitParamter->save();
       
    }
}



    

    

   

  

// dd("paramter",$parameter);
    // if ($validated['assigned']) {

    //     $roUnit->readingParameters()->create([
    //         'reading_parameter_id' => $parameter->id,
    //         'name' => $parameter->name,
    //         'display_name' => $parameter->display_name,
    //         'code' => $parameter->code,
    //         'unit' => $parameter->unit,
    //         'input_type' => $parameter->input_type,
    //         'usage' => $parameter->usage,
    //         'track_difference' => $parameter->track_difference,
    //         'min_value' => $parameter->min_value,
    //         'max_value' => $parameter->max_value,
    //         'is_required' => $parameter->is_required,
    //         'is_active' => true,
    //     ]);

    // } else {

    //     $roUnit->readingParameters()
    //         ->where(
    //             'reading_parameter_id',
    //             $parameter->id
    //         )
    //         ->delete();

    // }


    // return back();
}
}
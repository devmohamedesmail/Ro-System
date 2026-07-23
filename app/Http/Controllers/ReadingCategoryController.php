<?php

namespace App\Http\Controllers;

use App\Models\ReadingCategory;
use App\Models\ReadingParameter;
use App\Models\RoUnit;
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
        $request->validate(['category_id' => 'required|exists:reading_categories,id']);
        $this->service->assignCategory($roUnit, $request->category_id);

        return redirect()->back();
    }

    public function unassign(Request $request, RoUnit $roUnit)
    {
        $request->validate(['category_id' => 'required|exists:reading_categories,id']);
        $this->service->unassignCategory($roUnit, $request->category_id);

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
}

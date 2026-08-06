<?php

namespace App\Services;

use App\Models\ReadingCategory;
use App\Models\ReadingParameter;
use App\Models\RoUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ReadingCategoryService
{
    // ─── Categories ──────────────────────────────────────────────────────

    public function getCompanyCategories(int $companyId): Collection
    {
        return ReadingCategory::where('company_id', $companyId)
            ->orWhere('company_id', null)
            ->orWhere('is_system', true)
            ->orderBy('order')
            // ->with(['parameters' => fn ($q) => $q->orderBy('order')])
            ->with('parameters')
            ->get();
    }

    public function storeCategory(Request $request, int $companyId): ReadingCategory
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'nullable|integer|min:0',
        ]);

        return ReadingCategory::create([
            'company_id' => $companyId,
            'name' => $request->name,
            'order' => $request->order ?? 0,
            'is_system' => false,
        ]);
    }

    public function updateCategory(Request $request, ReadingCategory $category): ReadingCategory
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'nullable|integer|min:0',
        ]);

        $category->update([
            'name' => $request->name,
            'order' => $request->order ?? $category->order,
        ]);

        return $category;
    }

    public function deleteCategory(ReadingCategory $category): void
    {
        $category->delete();
    }

    // ─── Assign / Unassign category to RO unit ────────────────────────────

    // public function assignCategory(RoUnit $roUnit, int $categoryId): void
    // {
    //     if (! $roUnit->readingCategories()->where('reading_category_id', $categoryId)->exists()) {
    //         $maxOrder = $roUnit->readingCategories()->max('ro_unit_reading_categories.order') ?? 0;
    //         $roUnit->readingCategories()->attach($categoryId, [
    //             'order' => $maxOrder + 1,
    //             'is_active' => true,
    //         ]);
    //     }
    // }

public function assignCategory(RoUnit $roUnit, int $categoryId): void
{
    if (! $roUnit->readingCategories()
        ->wherePivot('reading_category_id', $categoryId)
        ->exists()
    ) {

        $maxOrder = $roUnit->readingCategories()
            ->max('ro_unit_reading_categories.order') ?? 0;

        $roUnit->readingCategories()->attach($categoryId, [
            'order' => $maxOrder + 1,
            'is_active' => true,
        ]);
    }
}

    // public function unassignCategory(RoUnit $roUnit, int $categoryId): void
    // {
    //     $roUnit->readingCategories()->detach($categoryId);
    // }

    public function unassignCategory(RoUnit $roUnit, int $categoryId): void
{
    $roUnit->readingCategories()->detach($categoryId);
}

    // ─── Parameters ──────────────────────────────────────────────────────

    public function storeParameter(Request $request, ReadingCategory $category): ReadingParameter
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:100',
            'unit' => 'nullable|string|max:50',
            'input_type' => 'required|in:NUMBER,TEXT,BOOLEAN',
            'min_value' => 'nullable|numeric',
            'max_value' => 'nullable|numeric',
            'usage' => 'nullable|string|max:255',
            'track_difference' => 'nullable|boolean',
            'order' => 'nullable|integer|min:0',
            'is_required' => 'boolean',
        ]);

        return $category->parameters()->create([
            'name' => $request->name,
            'code' => $request->code,
            'unit' => $request->unit,
            'input_type' => $request->input_type ?? 'NUMBER',
            'min_value' => $request->min_value,
            'max_value' => $request->max_value,
            'usage' => $request->usage,
            'track_difference' => $request->track_difference,
            'order' => $request->order ?? 0,
            'is_required' => $request->boolean('is_required', false),
            'is_active' => true,
        ]);
    }

    public function updateParameter(Request $request, ReadingParameter $parameter): ReadingParameter
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:100',
            'unit' => 'nullable|string|max:50',
            'input_type' => 'required|in:NUMBER,TEXT,BOOLEAN',
            'min_value' => 'nullable|numeric',
            'max_value' => 'nullable|numeric',
            'usage' => 'nullable|string|max:255',
            'track_difference' => 'nullable|boolean',
            'order' => 'nullable|integer|min:0',
            'is_required' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $parameter->update($request->only([
            'name', 'code', 'unit', 'input_type', 'usage', 'track_difference',
            'min_value', 'max_value', 'order', 'is_required', 'is_active',
        ]));

        return $parameter;
    }

    public function deleteParameter(ReadingParameter $parameter): void
    {
        $parameter->delete();
    }
}
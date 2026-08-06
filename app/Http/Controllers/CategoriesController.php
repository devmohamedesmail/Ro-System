<?php

namespace App\Http\Controllers;

use App\Models\ReadingCategory;
use App\Models\ReadingParameter;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    public function __construct(protected CategoryService $categoryService)
    {
    }

    public function categories_page()
    {
        $categories = $this->categoryService->getCategoriesWithParameters();

        return Inertia::render("categories-parameters/index", [
            "categories" => $categories
        ]);
    }

    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
            'usage' => 'nullable|in:READING,DAILY_REPORT,BOTH',
            'is_active' => 'nullable|boolean',
        ]);

        $this->categoryService->storeCategory($validated);

        return back()->with('success', 'Category created successfully');
    }

    public function updateCategory(Request $request, ReadingCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
            'usage' => 'nullable|in:READING,DAILY_REPORT,BOTH',
            'is_active' => 'nullable|boolean',
        ]);

        $this->categoryService->updateCategory($category, $validated);

        return back()->with('success', 'Category updated successfully');
    }

    public function destroyCategory(ReadingCategory $category)
    {
        $this->categoryService->deleteCategory($category);

        return back()->with('success', 'Category deleted successfully');
    }

    public function storeParameter(Request $request, ReadingCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:100',
            'unit' => 'nullable|string|max:50',
            'input_type' => 'required|in:NUMBER,TEXT,BOOLEAN',
            'usage' => 'nullable|in:READING,DAILY_REPORT,BOTH',
            'track_difference' => 'nullable|boolean',
            'min_value' => 'nullable|numeric',
            'max_value' => 'nullable|numeric',
            'order' => 'nullable|integer',
            'is_required' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ]);

        $this->categoryService->storeParameter($category, $validated);

        return back()->with('success', 'Parameter created successfully');
    }

    public function updateParameter(Request $request, ReadingParameter $parameter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:100',
            'unit' => 'nullable|string|max:50',
            'input_type' => 'required|in:NUMBER,TEXT,BOOLEAN',
            'usage' => 'nullable|in:READING,DAILY_REPORT,BOTH',
            'track_difference' => 'nullable|boolean',
            'min_value' => 'nullable|numeric',
            'max_value' => 'nullable|numeric',
            'order' => 'nullable|integer',
            'is_required' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ]);

        $this->categoryService->updateParameter($parameter, $validated);

        return back()->with('success', 'Parameter updated successfully');
    }

    public function destroyParameter(ReadingParameter $parameter)
    {
        $this->categoryService->deleteParameter($parameter);

        return back()->with('success', 'Parameter deleted successfully');
    }
}
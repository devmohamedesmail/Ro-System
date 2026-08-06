<?php

namespace App\Services;

use App\Models\ReadingCategory;
use App\Models\ReadingParameter;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    /**
     * Get all categories with their associated parameters.
     */
    public function getCategoriesWithParameters(): Collection
    {
        $companyId = auth()->user()?->company_id;

        return ReadingCategory::query()
            ->when($companyId, function ($query, $companyId) {
                $query->where(function ($q) use ($companyId) {
                    $q->where('company_id', $companyId)
                      ->orWhereNull('company_id')
                      ->orWhere('is_system', true);
                });
            })
            ->with(['parameters' => function ($q) {
                $q->orderBy('order', 'asc');
            }])
            ->orderBy('order', 'asc')
            ->orderBy('id', 'asc')
            ->get();
    }

    /**
     * Store a new reading category.
     */
    public function storeCategory(array $data): ReadingCategory
    {
        $data['company_id'] = auth()->user()?->company_id;
        $data['is_system'] = false;
        $data['is_active'] = $data['is_active'] ?? true;
        $data['order'] = $data['order'] ?? 0;
        $data['usage'] = $data['usage'] ?? 'READING';

        return ReadingCategory::create($data);
    }

    /**
     * Update an existing reading category.
     */
    public function updateCategory(ReadingCategory $category, array $data): bool
    {
        return $category->update($data);
    }

    /**
     * Delete a reading category.
     */
    public function deleteCategory(ReadingCategory $category): ?bool
    {
        return $category->delete();
    }

    /**
     * Store a new reading parameter under a category.
     */
    public function storeParameter(ReadingCategory $category, array $data): ReadingParameter
    {
        $data['company_id'] = auth()->user()?->company_id;
        $data['reading_category_id'] = $category->id;
        $data['input_type'] = $data['input_type'] ?? 'NUMBER';
        $data['usage'] = $data['usage'] ?? 'READING';
        $data['order'] = $data['order'] ?? 0;
        $data['is_required'] = $data['is_required'] ?? false;
        $data['is_active'] = $data['is_active'] ?? true;

        return ReadingParameter::create($data);
    }

    /**
     * Update an existing reading parameter.
     */
    public function updateParameter(ReadingParameter $parameter, array $data): bool
    {
        return $parameter->update($data);
    }

    /**
     * Delete a reading parameter.
     */
    public function deleteParameter(ReadingParameter $parameter): ?bool
    {
        return $parameter->delete();
    }
}

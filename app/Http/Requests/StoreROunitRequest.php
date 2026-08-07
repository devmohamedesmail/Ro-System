<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreROunitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'station_id' => 'required|exists:stations,id',
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:100',
            'capacity' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'serial_number' => 'nullable|string|max:255',
            'manufacturer' => 'nullable|string|max:255',

            'pressure_vessels' => 'nullable|integer|min:0',
            'membranes_per_vessel' => 'nullable|integer|min:0',
            'total_membranes' => 'nullable|integer|min:0',
            'membrane_model' => 'nullable|string|max:255',
            'hpp_model' => 'nullable|string|max:255',
            'hpp_brand' => 'nullable|string|max:255',
            'hpp_power_kw' => 'nullable|numeric|min:0',
            'feed_pump_model' => 'nullable|string|max:255',
            'chemical_dosing_model' => 'nullable|string|max:255',
            'sand_filters' => 'nullable|integer|min:0',
            'carbon_filters' => 'nullable|integer|min:0',
            'cartridge_filters' => 'nullable|integer|min:0',
            'cartridge_size' => 'nullable|string|max:255',
            'design_flow' => 'nullable|numeric|min:0',
            'recovery_rate' => 'nullable|numeric|min:0',
            'design_pressure' => 'nullable|numeric|min:0',
            'plc_model' => 'nullable|string|max:255',
            'vfd_model' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
        ];
    }
}

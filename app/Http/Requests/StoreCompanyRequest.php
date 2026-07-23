<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'unique:companies,email',
            ],

            'phone' => [
                'nullable',
                'string',
            ],

            'whatsapp' => [
                'nullable',
                'string',
            ],

            'website' => [
                'nullable',
                'url',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'country' => [
                'nullable',
                'string',
            ],

            'city' => [
                'nullable',
                'string',
            ],

            'address' => [
                'nullable',
                'string',
            ],

            'logo' => [
                'nullable',
                'image',
                'max:2048',
            ],
        ];
    }
}

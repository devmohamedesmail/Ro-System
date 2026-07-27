<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReadingSessionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    // public function toArray(Request $request): array
    // {
    //     return parent::toArray($request);
    // }

    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'ro_unit_id' => $this->ro_unit_id,

            'reading_at' => $this->reading_at,

            'categories' => $this->readingValues

                ->groupBy(function ($readingValue) {

                    return $readingValue
                        ->parameter
                        ->category_id;

                })

                ->map(function ($values) {

                    $category = $values
                        ->first()
                        ->parameter
                        ->category;

                    return [

                        'id' => $category->id,

                        'name' => $category->name,

                        'parameters' => $values
                            ->map(function ($value) {

                                return [

                                    'id' => $value
                                        ->parameter
                                        ->id,

                                    'name' => $value
                                        ->parameter
                                        ->name,

                                    'value' => $value->value,

                                    'unit' => $value
                                        ->parameter
                                        ->unit,

                                ];

                            })

                            ->values(),

                    ];

                })

                ->values(),

        ];
    }
}

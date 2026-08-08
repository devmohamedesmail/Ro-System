<?php

namespace App\Models;

use App\Models\ReadingParameter;
use App\Models\RoUnitReadingCategory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoUnitReadingParameter extends Model
{
    /** @use HasFactory<\Database\Factories\RoUnitReadingParameterFactory> */
    use HasFactory;
       protected $fillable = [
        'ro_unit_reading_category_id',
        'ro_unit_id',
        'reading_parameter_id',
        'name',
        'code',
        'unit',
        'input_type',
        'usage',
        'track_difference',
        'min_value',
        'max_value',
        'order',
        'is_required',
        'is_active',
    ];

    protected $casts = [
        'track_difference' => 'boolean',
        'is_required' => 'boolean',
        'is_active' => 'boolean',
        'min_value' => 'decimal:3',
        'max_value' => 'decimal:3',
    ];

    // public function category()
    // {
    //     return $this->belongsTo(
    //         RoUnitReadingCategory::class,
    //         'ro_unit_reading_category_id'
    //     );
    // }


    // public function readingParamer(){
    //     return $this->belongsTo(ReadingParameter::class);
    // }


    // public function ro_reading_category(){
    //     return $this->belongsTo(RoUnitReadingCategory::class);
    // }


     public function roUnit()
    {
        return $this->belongsTo(
            RoUnit::class
        );
    }


    public function category()
    {
        return $this->belongsTo(
            RoUnitReadingCategory::class,
            'ro_unit_reading_category_id'
        );
    }


    // public function parameter()
    // {
    //     return $this->belongsTo(
    //         ReadingParameter::class
    //     );
    // }

    
public function parameter()
{
    return $this->belongsTo(
        ReadingParameter::class,
        'reading_parameter_id'
    );
}


public function readingCategory()
{
    return $this->belongsTo(
        RoUnitReadingCategory::class,
        'ro_unit_reading_category_id'
    );
}



public function readingParameter()
{
    return $this->belongsTo(ReadingParameter::class);
}
}
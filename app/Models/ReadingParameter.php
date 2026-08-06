<?php

namespace App\Models;

use App\Models\RoUnit;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReadingParameter extends Model
{
    /** @use HasFactory<ReadingParameterFactory> */
    use HasFactory;

    protected $fillable = [
        'reading_category_id',
        'company_id',
        'ro_unit_id',
        'ro_unit_reading_category_id',
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
        'min_value' => 'float',
        'max_value' => 'float',
        'track_difference' => 'boolean',
        'is_required' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

 
    // public function category(){
    //     return $this->belongsTo(ReadingCategory::class);}

    // public function readingValues()
    // {
    //     return $this->hasMany(
    //         ReadingValue::class,
    //         'parameter_id'
    //     );
    // }


//  public function roUnits()
// {
//     return $this->belongsToMany(
//         RoUnit::class,
//         'ro_unit_reading_parameters',
//         'reading_parameter_id',
//         'ro_unit_id'
//     );
// }


// public function roUnitParamter(){
//     return $this->hasMany(RoUnitReadingParameter::class);
// }



 public function category()
    {
        return $this->belongsTo(
            ReadingCategory::class
        );
    }


    public function unitParameters()
    {
        return $this->hasMany(
            RoUnitReadingParameter::class
        );
    }
}
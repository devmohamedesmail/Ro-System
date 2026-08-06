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
        'category_id',
        'name',
        'code',
        'unit',
        'input_type',
        'min_value',
        'max_value',
        'usage',
        'track_difference',
        'order',
        'is_required',
        'is_active',
    ];

    protected $casts = [
        'min_value' => 'decimal:3',
        'max_value' => 'decimal:3',
        'is_required' => 'boolean',
        'is_active' => 'boolean',
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
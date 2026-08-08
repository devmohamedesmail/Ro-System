<?php

namespace App\Models;

use App\Models\RoUnitReadingParameter;
use Database\Factories\RoUnitReadingCategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoUnitReadingCategory extends Model
{
    /** @use HasFactory<RoUnitReadingCategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'ro_unit_id',
        'reading_category_id',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // public function roUnit()
    // {
    //     return $this->belongsTo(RoUnit::class);
    // }

    // public function category()
    // {
    //     return $this->belongsTo(
    //         ReadingCategory::class,
    //         'reading_category_id'
    //     );
    // }


        //     public function parameters()
        // {
        //     return $this->hasMany(RoUnitReadingParameter::class);
        // }



        // public function ro_reading_parameters(){
        //     return $this->hasMany(RoUnitReadingParameter::class);
        // }



    public function roUnit()
    {
        return $this->belongsTo(
            RoUnit::class
        );
    }


    // public function category()
    // {
    //     return $this->belongsTo(
    //         ReadingCategory::class
    //     );
    // }

      public function category()
    {
        return $this->belongsTo(
            ReadingCategory::class,
            'reading_category_id'
        );
    }

    // public function parameters()
    // {
    //     return $this->hasMany(
    //         RoUnitReadingParameter::class
    //     );
    // }

public function parameters()
{
    return $this->hasMany(
        RoUnitReadingParameter::class,
        'ro_unit_reading_category_id'
    );
}



public function assignedParameters()
{
    return $this->hasMany(
        RoUnitReadingParameter::class,
        'ro_unit_reading_category_id'
    );
}



public function readingCategory()
{
    return $this->belongsTo(ReadingCategory::class,'reading_category_id');
}
}
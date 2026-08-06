<?php

namespace App\Models;

use App\Models\ReadingParameter;
use Database\Factories\ReadingCategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReadingCategory extends Model
{
    /** @use HasFactory<ReadingCategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'company_id',
        'ro_unit_id',
        'name',
        'is_system',
        'order',
    ];

    protected $casts = [
        'is_system' => 'boolean',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

  

      public function parameters()
    {
        return $this->hasMany(
            ReadingParameter::class,
            'reading_category_id'
        );
    }



    public function roUnits()
{
    return $this->belongsToMany(
        RoUnit::class,
        'ro_unit_reading_categories',
        'reading_category_id',
        'ro_unit_id'
    )
    ->withPivot([
        'order',
        'is_active'
    ]);
}

}
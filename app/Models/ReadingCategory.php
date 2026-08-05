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

    public function roUnit()
    {
        return $this->belongsTo(RoUnit::class);
    }

   

    public function parameters(){
        return $this->hasMany(ReadingParameter::class);
    }

    public function roUnits()
    {
        return $this->hasMany(
            RoUnitReadingCategory::class,
            'reading_category_id'
        );
    }



}
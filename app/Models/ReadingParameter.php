<?php

namespace App\Models;

use Database\Factories\ReadingParameterFactory;
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

    public function category()
    {
        return $this->belongsTo(
            ReadingCategory::class,
            'category_id'
        );
    }

    public function readingValues()
    {
        return $this->hasMany(
            ReadingValue::class,
            'parameter_id'
        );
    }
}

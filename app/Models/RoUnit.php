<?php

namespace App\Models;

use Database\Factories\RoUnitFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoUnit extends Model
{
    /** @use HasFactory<RoUnitFactory> */
    use HasFactory;

    protected $fillable = [
        'station_id',
        'name',
        'code',
        'capacity',
        'description',
        'serial_number',
        'manufacturer',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'capacity' => 'float',
        ];
    }

    public function station(): BelongsTo
    {
        return $this->belongsTo(Station::class);
    }

    // public function readingCategories(): BelongsToMany
    // {
    //     return $this->belongsToMany(
    //         ReadingCategory::class,
    //         'ro_unit_reading_categories',
    //         'ro_unit_id',
    //         'reading_category_id'
    //     )->withPivot(['order', 'is_active'])->orderBy('ro_unit_reading_categories.order');
    // }

    public function readingSessions(): HasMany
    {
        return $this->hasMany(ReadingSession::class);
    }

    // public function readingParameters()
    // {
    //     return $this->hasMany(
    //         RoUnitReadingParameter::class
    //     );
    // }

    public function readingCategories()
    {
        return $this->hasMany(RoUnitReadingCategory::class);
    }

    public function readingParameters()
    {
        return $this->hasMany(RoUnitReadingParameter::class);
    }
}
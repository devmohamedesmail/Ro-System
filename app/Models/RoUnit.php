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
        'company_id',
        'station_id',
        'name',
        'code',
        'capacity',
        'description',
        'serial_number',
        'manufacturer',
        'pressure_vessels',
        'membranes_per_vessel',
        'total_membranes',
        'membrane_model',
        'hpp_model',
        'hpp_brand',
        'hpp_power_kw',
        'feed_pump_model',
        'chemical_dosing_model',
        'sand_filters',
        'carbon_filters',
        'cartridge_filters',
        'cartridge_size',
        'design_flow',
        'recovery_rate',
        'design_pressure',
        'plc_model',
        'vfd_model',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'capacity' => 'float',
            'pressure_vessels' => 'integer',
            'membranes_per_vessel' => 'integer',
            'total_membranes' => 'integer',
            'hpp_power_kw' => 'float',
            'sand_filters' => 'integer',
            'carbon_filters' => 'integer',
            'cartridge_filters' => 'integer',
            'design_flow' => 'float',
            'recovery_rate' => 'float',
            'design_pressure' => 'float',
        ];
    }

// -------------------- Relations ----------------------------
    public function station(): BelongsTo
    {
        return $this->belongsTo(Station::class);
    }

    public function readingCategories()
    {
        return $this->belongsToMany(
            ReadingCategory::class,
            'ro_unit_reading_categories',
            'ro_unit_id',
            'reading_category_id'
        )
        ->withPivot([
            'id',
            'order',
            'is_active'
        ])
        ->orderBy('ro_unit_reading_categories.order');
    }

    public function readingParameters()
    {
        return $this->hasMany(
            RoUnitReadingParameter::class,
            'ro_unit_id'
        );
    }

    public function roUnitReadingCategories()
    {
        return $this->hasMany(
            RoUnitReadingCategory::class,
            'ro_unit_id'
        );
    }

    public function readingSessions(): HasMany
    {
        return $this->hasMany(ReadingSession::class);
    }
}
<?php

namespace App\Models;

use Database\Factories\RoUnitFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}

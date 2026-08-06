<?php

namespace App\Models;

use App\Models\Company;
use App\Models\Inventory;
use App\Models\RoUnit;
use App\Models\User;
use Database\Factories\StationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Station extends Model
{
    /** @use HasFactory<StationFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'code',
        'phone',
        'country',
        'city',
        'address',
        'lat',
        'lng',
        'is_active',
        'company_id',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
    // --------------------------------------------------------
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }




    // --------------------------------------------------------
    public function roUnits(): HasMany
    {
        return $this->hasMany(RoUnit::class);
    }



    // --------------------------------------------------------
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_stations');
    }


    // --------------------------------------------------------
    public function inventory()
    {
        return $this->hasOne(Inventory::class);
    }
}
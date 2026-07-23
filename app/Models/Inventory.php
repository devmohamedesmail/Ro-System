<?php

namespace App\Models;

use App\Models\Company;
use App\Models\InventoryItem;
use App\Models\Station;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    /** @use HasFactory<\Database\Factories\InventoryFactory> */
    use HasFactory;

    protected $fillable = [
        'company_id',
        'station_id',
        'name',
        'description',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function items()
    {
        return $this->hasMany(InventoryItem::class);
    }
}
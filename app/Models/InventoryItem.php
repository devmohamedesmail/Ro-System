<?php

namespace App\Models;

use Database\Factories\InventoryItemFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    /** @use HasFactory<InventoryItemFactory> */
    use HasFactory;

    protected $fillable = [
        'inventory_id',
        'name',
        'code',
        'type',
        'unit',
        'quantity',
        'minimum_quantity',
        'description',
    ];

    protected $casts = [
        'quantity' => 'float',
        'minimum_quantity' => 'float',
    ];

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }

    public function transactions()
    {
        return $this->hasMany(InventoryTransaction::class);
    }
}

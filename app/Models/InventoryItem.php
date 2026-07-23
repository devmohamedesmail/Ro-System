<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    /** @use HasFactory<\Database\Factories\InventoryItemFactory> */
    use HasFactory;


    public function inventory()
{
    return $this->belongsTo(Inventory::class);
}

public function transactions()
{
    return $this->hasMany(InventoryTransaction::class);
}
}
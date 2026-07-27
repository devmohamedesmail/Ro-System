<?php

namespace App\Models;

use Database\Factories\InventoryTransactionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryTransaction extends Model
{
    /** @use HasFactory<InventoryTransactionFactory> */
    use HasFactory;

    protected $fillable = [
        'inventory_item_id',
        'transaction_type',
        'quantity',
        'unit_price',
        'reference_type',
        'reference_id',
        'notes',
        'transaction_date',
    ];

    public function item()
    {
        return $this->belongsTo(InventoryItem::class);
    }

    public function reference()
    {
        return $this->morphTo();
    }

    public function scopeInStock($query)
    {
        return $query->where('transaction_type', 'in');
    }

    public function scopeOutStock($query)
    {
        return $query->where('transaction_type', 'out');
    }

    public function scopeCurrentStock($query)
    {
        return $query->selectRaw('inventory_item_id, SUM(CASE WHEN transaction_type = "in" THEN quantity ELSE -quantity END) AS current_stock')
            ->groupBy('inventory_item_id');
    }
}

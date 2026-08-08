<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MaterialReceivingItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'material_receiving_form_id',
        'serial_number',
        'item_code',
        'material_description',
        'part_serial_number',
        'valuation_type',
        'bin_location',
        'unit',
        'quantity',
        'sto_pro_no',
        'invoice_no',
    ];

    protected $casts = [
        'serial_number' => 'integer',
        'quantity' => 'float',
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(MaterialReceivingForm::class, 'material_receiving_form_id');
    }
}

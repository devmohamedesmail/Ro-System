<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MaterialIssuingItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'station_id',
        'material_issue_form_id',
        'serial_number',
        'item_code',
        'valuation_type',
        'material_description',
        'pm_order',
        'unit',
        'balance',
        'quantity',
        'balance_after',
    ];

    protected $casts = [
        'balance' => 'float',
        'quantity' => 'float',
        'balance_after' => 'float',
        'serial_number' => 'integer',
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(MaterialIssuingForm::class, 'material_issue_form_id');
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function station(): BelongsTo
    {
        return $this->belongsTo(Station::class);
    }
}

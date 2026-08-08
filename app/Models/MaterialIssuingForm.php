<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MaterialIssuingForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_number',
        'from_location',
        'store_location',
        'from_date',
        'to_date',
        'is_transfer',
        'is_maintenance_direct_issue',
        'remarks',
        'issued_by',
        'recieved_by',
    ];

    protected $casts = [
        'is_transfer' => 'boolean',
        'is_maintenance_direct_issue' => 'boolean',
        'from_date' => 'date',
        'to_date' => 'date',
    ];

    public function issuedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'issued_by');
    }

    public function recievedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recieved_by');
    }

    public function items(): HasMany
    {
        return $this->hasMany(MaterialIssuingItem::class, 'material_issue_form_id');
    }
}

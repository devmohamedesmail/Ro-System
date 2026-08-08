<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MaterialReceivingForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_number',
        'location',
        'from_plant',
        'store_location',
        'from_date',
        'to_date',
        'remarks',
        'received_by',
        'reviewed_by',
        'requested_by',
        'approved_by',
        'operator',
        'area_supervisor',
        'department',
        'department_head',
        'distribution_original',
        'distribution_green',
        'distribution_red',
    ];

    protected $casts = [
        'from_date' => 'date',
        'to_date' => 'date',
    ];

    public function receivedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'received_by');
    }

    public function reviewedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function requestedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function items(): HasMany
    {
        return $this->hasMany(MaterialReceivingItem::class, 'material_receiving_form_id');
    }
}

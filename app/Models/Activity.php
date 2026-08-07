<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'station_id',
        'ro_unit_id',
        'title',
        'description',
        'type',
        'priority',
        'status',
        'planned_start_at',
        'planned_end_at',
        'started_at',
        'completed_at',
        'is_recurring',
        'repeat_every_days',
        'created_by',
        'assigned_to',
    ];

    protected $casts = [
        'is_recurring' => 'boolean',
        'repeat_every_days' => 'integer',
        'planned_start_at' => 'datetime',
        'planned_end_at' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function station(): BelongsTo
    {
        return $this->belongsTo(Station::class);
    }

    public function roUnit(): BelongsTo
    {
        return $this->belongsTo(RoUnit::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(ActivityTask::class)->orderBy('order');
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(ActivityAttachment::class);
    }
}

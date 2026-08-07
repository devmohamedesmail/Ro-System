<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActivityTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity_id',
        'title',
        'is_completed',
        'completed_at',
        'completed_by',
        'order',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'order' => 'integer',
        'completed_at' => 'datetime',
    ];

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }

    public function completedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'completed_by');
    }
}

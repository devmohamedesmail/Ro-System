<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActivityAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity_id',
        'uploaded_by',
        'file',
        'file_name',
        'mime_type',
        'size',
    ];

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }
}

<?php

namespace App\Models;

use Database\Factories\ReadingSessionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReadingSession extends Model
{
    /** @use HasFactory<ReadingSessionFactory> */
    use HasFactory;

    protected $fillable = [
        'ro_unit_id',
        'user_id',
        'reading_at',
        'notes',
    ];

    protected $casts = [
        'reading_at' => 'datetime',
    ];

    public function roUnit()
    {
        return $this->belongsTo(
            RoUnit::class
        );
    }

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }

    public function readingValues()
    {
        return $this->hasMany(
            ReadingValue::class,
            'reading_session_id'
        );
    }
}
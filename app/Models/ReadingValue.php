<?php

namespace App\Models;

use Database\Factories\ReadingValueFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReadingValue extends Model
{
    /** @use HasFactory<ReadingValueFactory> */
    use HasFactory;

    protected $fillable = [
        'session_id',
        'parameter_id',
        'value',
    ];

    protected $casts = [
        'value' => 'decimal:3',
    ];

    public function session()
    {
        return $this->belongsTo(
            ReadingSession::class
        );
    }

  public function roUnitReadingParameter()
{
    return $this->belongsTo(RoUnitReadingParameter::class);
}
}
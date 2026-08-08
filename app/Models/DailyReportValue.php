<?php

namespace App\Models;

use Database\Factories\DailyReportValueFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyReportValue extends Model
{
    /** @use HasFactory<DailyReportValueFactory> */
    use HasFactory;

    protected $fillable = [
        'daily_report_id',
        'ro_unit_reading_parameter_id',
        'previous_value',
        'current_value',
        'difference',
    ];

    protected $casts = [
        'previous_value' => 'decimal:3',
        'current_value' => 'decimal:3',
        'difference' => 'decimal:3',
    ];

    public function dailyReport()
    {
        return $this->belongsTo(DailyReport::class);
    }

   public function roUnitReadingParameter()
{
    return $this->belongsTo(
        RoUnitReadingParameter::class,
        'ro_unit_reading_parameter_id'
    );
}
}
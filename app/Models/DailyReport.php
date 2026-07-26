<?php

namespace App\Models;

use Database\Factories\DailyReportFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyReport extends Model
{
    /** @use HasFactory<DailyReportFactory> */
    use HasFactory;

    protected $fillable = [

        'ro_unit_id',
        'user_id',
        'report_date',

        'running_hours',
        'water_production',
        'client_consumption',
        'outside_sales',
        'network_sales',

        'high_pressure_pump_power',
        'booster_pump_power',
        'specific_power',

        'free_chlorine',
        'tank_level',

        'anti_scalant_pre_level',
        'anti_scalant_preparation',
        'anti_scalant_current_level',
        'anti_scalant_consumption',
        'anti_scalant_strength',

        'coagulant_consumption',
        'smbs_consumption',
        'chlorine_consumption',
        'soda_consumption',

        'feed_pump_operation_hours',
        'feed_pump_ampere',
        'feed_pump_in_pressure',
        'feed_pump_out_pressure',
        'feed_pump_frequency',
        'feed_pump_speed',

        'actions',
        'recommendations',
    ];

    protected $casts = [
        'report_date' => 'date',
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

    public function values()
    {
        return $this->hasMany(DailyReportValue::class);
    }
}

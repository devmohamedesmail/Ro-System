<?php

namespace App\Services;

use App\Models\ReadingSession;
use App\Models\ReadingValue;
use App\Models\RoUnit;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReadingService
{
    public const READING_INTERVAL_HOURS = 3;

    /**
     * Check if a new reading is allowed for the given RO unit.
     * Returns null if allowed, or the Carbon time of the next allowed reading.
     */
    public function nextAllowedAt(RoUnit $roUnit): ?CarbonInterface
    {
        $last = $roUnit->lastReadingSession()->first();

        if (! $last) {
            return null;
        }

        $next = $last->reading_at->addHours(self::READING_INTERVAL_HOURS);

        return now()->lessThan($next) ? $next : null;
    }

    /**
     * Store a new reading session with all values.
     * Throws \RuntimeException if the 3-hour rule is violated.
     */
    public function store(Request $request, RoUnit $roUnit): ReadingSession
    {

        // dd($request);
        // $nextAllowed = $this->nextAllowedAt($roUnit);

        // if ($nextAllowed !== null) {
        //     throw new \RuntimeException(
        //         'Too soon. Next reading allowed at: ' . $nextAllowed->toDateTimeString()
        //     );
        // }

        return DB::transaction(function () use ($request, $roUnit) {
            $session = ReadingSession::create([
                'ro_unit_id' => $roUnit->id,
                'user_id' => Auth::user()->id ?? 1,
                // 'user_id' => auth()->id() ?? 1,
                'reading_at' => now(),
                'notes' => $request->notes,
            ]);

            $values = $request->input('values', []);

            foreach ($values as $parameterId => $value) {
                if ($value === null || $value === '') {
                    continue;
                }

                ReadingValue::create([
                    'session_id' => $session->id,
                
                    'parameter_id' => $parameterId,
                    'value' => $value,
                ]);
            }

            return $session;
        
        });
    }
}
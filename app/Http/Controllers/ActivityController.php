<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityTask;
use App\Services\ActivityService;
use App\Services\CloudinaryService;
use App\Services\StationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function __construct(
        protected StationService $stationService, 
        protected ActivityService $activityService,
        protected CloudinaryService $cloudinaryService
    ) {}

    public function activities_page()
    {
        $activities = $this->activityService->getCompanyActivities();
        $stations = $this->stationService->getAuthStations();

        return Inertia::render("activities/index", [
            "activities" => $activities,
            "stations" => $stations,
        ]);
    }

    public function create_activities_page()
    {
        $user = Auth::user();
        $company = $user?->company;
        $users = $company ? $company->users()->select('id', 'name', 'email')->get() : [];

        return Inertia::render("activities/create", [
            "stations" => $this->stationService->getAuthStations(),
            "users" => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'station_id' => 'nullable|exists:stations,id',
            'ro_unit_id' => 'nullable|exists:ro_units,id',
            'assigned_to' => 'nullable|exists:users,id',
            'type' => 'required|in:maintenance,inspection,cleaning,replacement,calibration,audit,other',
            'priority' => 'required|in:low,medium,high,urgent',
            'status' => 'required|in:pending,in_progress,completed,cancelled',
            'planned_start_at' => 'nullable|date',
            'planned_end_at' => 'nullable|date',
            'description' => 'nullable|string',
            'is_recurring' => 'nullable|boolean',
            'repeat_every_days' => 'nullable|integer|min:1',
            'tasks' => 'nullable|array',
            'attachments.*' => 'nullable|file|mimes:jpg,jpeg,png,webp,pdf,doc,docx|max:10240',
        ]);

        $this->activityService->storeActivity($request);

        return redirect()->route('activities.page')->with('success', 'Activity created successfully');
    }

    public function toggleTask(ActivityTask $task)
    {
        $this->activityService->toggleTask($task);
        return back();
    }

    public function updateStatus(Request $request, Activity $activity)
    {
        $request->validate([
            'status' => 'required|in:pending,in_progress,completed,cancelled',
        ]);

        $this->activityService->updateStatus($activity, $request->status);
        return back();
    }
}
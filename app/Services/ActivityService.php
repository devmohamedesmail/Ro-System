<?php

namespace App\Services;

use App\Models\Activity;
use App\Models\ActivityAttachment;
use App\Models\ActivityTask;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ActivityService
{
    public function __construct(protected CloudinaryService $cloudinaryService)
    {
    }

    /**
     * Get all activities for the user's company with station, roUnit, creator, assignee, tasks, and attachments.
     */
    public function getCompanyActivities(): Collection
    {
        $companyId = Auth::user()?->company_id;

        return Activity::query()
            ->when($companyId, function ($query, $companyId) {
                $query->where('company_id', $companyId);
            })
            ->with([
                'station:id,name,code',
                'roUnit:id,name,code',
                'creator:id,name,email',
                'assignee:id,name,email',
                'tasks' => fn ($q) => $q->orderBy('order', 'asc'),
                'attachments'
            ])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Toggle the completed status of an activity task.
     */
    public function toggleTask(ActivityTask $task): bool
    {
        $task->is_completed = !$task->is_completed;
        $task->completed_at = $task->is_completed ? now() : null;
        $task->completed_by = $task->is_completed ? Auth::id() : null;
        return $task->save();
    }

    /**
     * Update activity status.
     */
    public function updateStatus(Activity $activity, string $status): bool
    {
        $activity->status = $status;
        if ($status === 'in_progress' && !$activity->started_at) {
            $activity->started_at = now();
        } elseif ($status === 'completed') {
            $activity->completed_at = now();
        }
        return $activity->save();
    }

    /**
     * Store a newly created Activity along with tasks and Cloudinary attachments.
     */
    public function storeActivity(Request $request): Activity
    {
        return DB::transaction(function () use ($request) {
            $user = Auth::user();

            $activity = Activity::create([
                'company_id' => $user->company_id ?? 1,
                'created_by' => $user->id,
                'station_id' => $request->station_id ? (int) $request->station_id : null,
                'ro_unit_id' => $request->ro_unit_id ? (int) $request->ro_unit_id : null,
                'assigned_to' => $request->assigned_to ? (int) $request->assigned_to : null,
                'title' => $request->title,
                'description' => $request->description,
                'type' => $request->type ?? 'other',
                'priority' => $request->priority ?? 'medium',
                'status' => $request->status ?? 'pending',
                'planned_start_at' => $request->planned_start_at,
                'planned_end_at' => $request->planned_end_at,
                'is_recurring' => $request->boolean('is_recurring', false),
                'repeat_every_days' => $request->repeat_every_days ? (int) $request->repeat_every_days : null,
            ]);

            // Save Tasks Checklist
            if ($request->has('tasks') && is_array($request->tasks)) {
                foreach ($request->tasks as $index => $taskData) {
                    $taskTitle = is_array($taskData) ? ($taskData['title'] ?? null) : $taskData;
                    if (!empty(trim($taskTitle))) {
                        ActivityTask::create([
                            'activity_id' => $activity->id,
                            'title' => trim($taskTitle),
                            'is_completed' => false,
                            'order' => $index + 1,
                        ]);
                    }
                }
            }

            // Upload and Save Attachments via CloudinaryService
            if ($request->hasFile('attachments')) {
                $files = $request->file('attachments');
                if (!is_array($files)) {
                    $files = [$files];
                }

                foreach ($files as $file) {
                    if ($file && $file->isValid()) {
                        $upload = $this->cloudinaryService->uploadToCloudinary($file, 'activities');
                        if ($upload && isset($upload['url'])) {
                            ActivityAttachment::create([
                                'activity_id' => $activity->id,
                                'uploaded_by' => $user->name ?? 'User',
                                'file' => $upload['url'],
                            ]);
                        }
                    }
                }
            }

            return $activity;
        });
    }
}

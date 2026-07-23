<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function __construct(protected UserService $userService) {}

    public function users_page()
    {
        $companyId = auth()->user()?->company_id ?? 1;

        $users = User::where('company_id', $companyId)
            ->with('stations:id,name,code')
            ->orderBy('created_at', 'desc')
            ->get();

        $stations = Station::where('company_id', $companyId)
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code']);

        return Inertia::render('company-users/index', [
            'users' => $users,
            'stations' => $stations,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'station_ids' => 'nullable|array',
            'station_ids.*' => 'exists:stations,id',
        ]);

        $request->merge(['company_id' => auth()->user()?->company_id ?? 1]);
        $this->userService->store($request);

        return redirect()->back();
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:8',
            'station_ids' => 'nullable|array',
            'station_ids.*' => 'exists:stations,id',
        ]);

        $this->userService->update($request, $user);

        return redirect()->back();
    }

    public function destroy(User $user)
    {
        $this->userService->destroy($user);

        return redirect()->back();
    }
}

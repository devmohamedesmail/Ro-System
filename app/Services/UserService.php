<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{
    public function store(Request $request): User
    {
        $user = new User;
        $user->name = $request->name;
        $user->username = $this->generateUsername($request->name);
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->company_id = $request->company_id;

        if ($request->filled('role_id')) {
            $user->role_id = $request->role_id;
        }

        $user->save();

        if ($request->filled('station_ids')) {
            $user->stations()->sync($request->station_ids);
        }

        return $user;
    }

    public function update(Request $request, User $user): User
    {
        $user->name = $request->name ?? $user->name;
        $user->email = $request->email ?? $user->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        if ($request->filled('role_id')) {
            $user->role_id = $request->role_id;
        }

        $user->save();

        if ($request->has('station_ids')) {
            $user->stations()->sync($request->station_ids ?? []);
        }

        return $user;
    }

    public function destroy(User $user): void
    {
        $user->stations()->detach();
        $user->delete();
    }

    public function getUserStations()
    {
        $stations = Auth::user()->stations()->with('roUnits.readingCategories.parameters')->get();
        return $stations;
    }

    private function generateUsername(string $name): string
    {
        // convert name to slug
        $username = Str::slug($name);

        // fallback if Arabic name
        if (! $username) {
            $username = 'user';
        }

        $originalUsername = $username;
        $counter = 1;

        while (User::where('username', $username)->exists()) {
            $username = $originalUsername.$counter;
            $counter++;
        }

        return $username;
    }
}
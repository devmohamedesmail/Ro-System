<?php

namespace App\Providers;

use App\Models\Setting;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        // Inertia::share([
        //     'company' => function () {
        //         return Auth::user()?->company;
        //     },

        // ]);

//         Inertia::share([
//     'auth' => function () {
//         $user = Auth::user();

//         if (!$user) {
//             return null;
//         }

//         return [
//             'user' => $user,
//             'role' => $user->role,
//             'company' => $user->company,
//         ];
//     },
// ]);
        
   

        Inertia::share(
            'settings',
            fn() =>
            Cache::rememberForever('settings', function () {
                return Setting::firstOrFail()->toArray();
            })
        );
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn(): ?Password => app()->isProduction()
                ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
                : null,
        );
    }
}
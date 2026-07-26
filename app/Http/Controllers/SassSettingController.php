<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Services\CloudinaryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SassSettingController extends Controller
{

    public function __construct(protected CloudinaryService $cloudinaryService) {}



    public function sass_update()
    {
        $settings = Setting::first();
        return inertia('sass/index', ['settings' => $settings]);
    }



    public function update(Request $request)
    {
        $settings = Setting::first();


        $data = $request->validate([
            'app_name_en' => 'required|string',
            'app_name_ar' => 'required|string',
            'company_name' => 'required|string',

            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',

            'primary_color' => 'nullable|string',
            'secondary_color' => 'nullable|string',

            'footer_text' => 'nullable|string',

            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',

            'app_logo' => 'nullable|image|max:2048',
            'app_logo_dark' => 'nullable|image|max:2048',
        ]);



        /*
    |--------------------------------------------------------------------------
    | Upload App Logo
    |--------------------------------------------------------------------------
    */

        if ($request->hasFile('app_logo')) {


            // delete old image
            if ($settings->app_logo_public_id) {

                $this->cloudinaryService
                    ->deleteFromCloudinary(
                        $settings->app_logo_public_id
                    );
            }


            $logo = $this->cloudinaryService
                ->uploadToCloudinary(
                    $request->file('app_logo'),
                    'ro-system/settings'
                );


            if ($logo) {

                $data['app_logo'] = $logo['url'];

                $data['app_logo_public_id'] =
                    $logo['public_id'];
            }
        }




        /*
    |--------------------------------------------------------------------------
    | Upload Dark Logo
    |--------------------------------------------------------------------------
    */

        if ($request->hasFile('app_logo_dark')) {


            if ($settings->logo_dark_public_id) {

                $this->cloudinaryService
                    ->deleteFromCloudinary(
                        $settings->logo_dark_public_id
                    );
            }


            $darkLogo = $this->cloudinaryService
                ->uploadToCloudinary(
                    $request->file('app_logo_dark'),
                    'ro-system/settings'
                );


            if ($darkLogo) {

                $data['app_logo_dark'] = $darkLogo['url'];

                $data['logo_dark_public_id'] =
                    $darkLogo['public_id'];
            }
        }



        $settings->update($data);

        Cache::forget('settings');

        return back()->with(
            'success',
            'Settings updated'
        );
    }
}
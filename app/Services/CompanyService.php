<?php

namespace App\Services;

use App\Http\Requests\StoreCompanyRequest;
use App\Models\Company;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CompanyService
{
    public function __construct(
        protected CloudinaryService $cloudinaryService,
    ) {}

    public function createCompany(StoreCompanyRequest $request): Company
    {

        $company = new Company;
        $auth = Auth::user();
        $user = User::find($auth->id);
        $company->name = $request['name'];
        $company->email = $request['email'];
        $company->phone = $request['phone'];
        $company->whatsapp = $request['whatsapp'];
        $company->website = $request['website'];
        $company->description = $request['description'];
        $company->country = $request['country'];
        $company->city = $request['city'];
        $company->address = $request['address'];
        $company->slug = $this->generateSlug($company->name);
        $company->user_id = $auth->id;
        $company->company_code = $this->generateCompanyCode();
        if ($request->hasFile('logo')) {
            $logo = $this->cloudinaryService->uploadToCloudinary(
                $request->file('logo'),
                'companies',
            );
            if ($logo) {
                $company->logo = $logo['url'] ?? null;
                $company->public_id = $logo['public_id'] ?? null;
            }
        }

        $role = Role::where('slug', 'company-admin')->first();
        $user->role_id = $role->id;
        $user->save();
        $company->save();

        return $company;
    }

    private function generateSlug(string $name): string
    {
        $slug = mb_strtolower(trim($name));

        $slug = preg_replace('/[^\p{Arabic}\p{L}\p{N}\s-]/u', '', $slug);

        $slug = preg_replace('/[\s]+/u', '-', $slug);

        $originalSlug = $slug;
        $counter = 1;

        while (Company::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    private function generateCompanyCode(): string
    {
        $lastId = Company::max('id') + 1;

        return sprintf(
            'CMP-%s-%06d',
            now()->year,
            $lastId
        );
    }
}

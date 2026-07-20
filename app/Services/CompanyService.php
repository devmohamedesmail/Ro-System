<?php

namespace App\Services;

use App\Http\Requests\StoreCompanyRequest;
use App\Models\Company;
use App\Services\CloudinaryService;

class CompanyService
{
    public function __construct(
        protected CloudinaryService $cloudinaryService,
    ) {}


    public function createCompany(StoreCompanyRequest $request): Company
    {
        $company = new Company();
        $company->fill($request->validated());
        $company->slug = $this->generateSlug($company->name);
        $company->company_code = $this->generateCompanyCode();
        if ($request->hasFile('logo')) {
            $logo = $this->cloudinaryService->uploadToCloudinary(
                $request->file('logo'),
                'companies',
            );
            $company->logo = $logo['url'];
            $company->public_id = $logo['public_id'];
        }
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
<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'TAQA WATER',
                'slug' => 'taqa-water',
                'description' => null,
                'code' => 'CMP-2026-000001',
                'email' => 'taqa@gmail.com',
                'phone' => null,
                'address' => null,
                'website' => null,
                'logo' => 'https://res.cloudinary.com/dbcssdyv3/image/upload/v1784627224/companies/hg7cpo5v8a09apjjr0so.jpg',
                'logo_public_id' => 'companies/hg7cpo5v8a09apjjr0so',
                'tax_number' => null,
                'commercial_register' => null,
                'notes' => null,
                'is_active' => true,
                'is_verified' => false,
                'status' => 1,
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
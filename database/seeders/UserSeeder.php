<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['id' => 1],
            [
                'company_id' => null,
                'name' => 'Mohamed Esmail',
                'email' => 'dev.mohamed.esmail@gmail.com',
                'username' => 'mohamed-esmail',
                'phone' => null,
                'role_id' => 2,
                'avatar' => null,
                'is_active' => 1,
                'is_verified' => 0,
                'type' => 'personal',
                'password' => '$2y$12$w1AbsOGgPAJb51.JHTsu9uERkTkhuDvEv4rU8WDiwOsGgQVFndn8i',
                'created_at' => '2026-07-21 09:46:18',
                'updated_at' => '2026-07-21 09:47:06',
            ]
        );
    }
}

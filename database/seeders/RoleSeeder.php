<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Super Admin',
                'slug' => 'super-admin',
                'description' => 'Full access to manage the entire RO system platform.',
            ],
            [
                'name' => 'Company Admin',
                'slug' => 'company-admin',
                'description' => 'Manages company settings, stations, users, and reports.',
            ],
            [
                'name' => 'Station Manager',
                'slug' => 'station-manager',
                'description' => 'Manages RO stations, units, and monitoring operations.',
            ],
            [
                'name' => 'Operator',
                'slug' => 'operator',
                'description' => 'Responsible for entering RO readings and daily logs.',
            ],
            [
                'name' => 'Technician',
                'slug' => 'technician',
                'description' => 'Handles maintenance tasks and technical issues.',
            ],
            [
                'name' => 'Viewer',
                'slug' => 'viewer',
                'description' => 'Can view reports and system data without editing.',
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                [
                    'slug' => $role['slug'],
                ],
                [
                    'name' => $role['name'],
                    'description' => $role['description'],
                    'is_active' => true,
                ]
            );
        }
    }
}

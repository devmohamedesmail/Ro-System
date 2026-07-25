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
                'name' => 'Super Admin / مدير النظام',
                'slug' => 'super-admin',
                'description' => 'Full access to manage the entire RO system platform.',
            ],
            [
                'name' => 'Company Admin / مدير الشركة',
                'slug' => 'company-admin',
                'description' => 'Manages company settings, stations, users, and reports.',
            ],
            [
                'name' => 'Station Manager / مدير المحطة',
                'slug' => 'station-manager',
                'description' => 'Manages RO stations, units, and monitoring operations.',
            ],
            [
                'name' => 'Supervisior / مشرف',
                'slug' => 'supervisior',
                'description' => 'Manages RO stations, units, and monitoring operations.',
            ],
            [
                'name' => 'Chemical / كيميائي المحطة',
                'slug' => 'chemical',
                'description' => 'Responsible for entering RO readings and daily logs.',
            ],
            [
                'name' => 'Operator / مشغل المحطة',
                'slug' => 'operator',
                'description' => 'Responsible for entering RO readings and daily logs.',
            ], 
            [
                'name' => 'Technician / فني الصيانة',
                'slug' => 'technician',
                'description' => 'Handles maintenance tasks and technical issues.',
            ],
            [
                'name' => 'Viewer / مراقب',
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
<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $resources = [
            'companies',
            'stations',
            'ro-units',
            'users',
            'roles',
            'permissions',
            'reading-categories',
            'reading-parameters',
            'reading-sessions',
            'reports',
            'settings',
        ];

        $actions = [
            'view',
            'create',
            'update',
            'delete',
        ];

        foreach ($resources as $resource) {
            foreach ($actions as $action) {
                Permission::updateOrCreate(
                    ['name' => "{$action}-{$resource}"],
                    [
                        'description' => ucfirst($action) . ' ' . str_replace('-', ' ', $resource),
                    ]
                );
            }
        }

        // Extra permissions
        $extras = [
            [
                'name' => 'dashboard',
                'description' => 'Access dashboard',
            ],
            [
                'name' => 'export-reports',
                'description' => 'Export reports',
            ],
            [
                'name' => 'approve-readings',
                'description' => 'Approve reading sessions',
            ],
            [
                'name' => 'reject-readings',
                'description' => 'Reject reading sessions',
            ],
            [
                'name' => 'manage-company',
                'description' => 'Manage company profile',
            ],
            [
                'name' => 'manage-station-assignments',
                'description' => 'Assign users to stations',
            ],
        ];

        foreach ($extras as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission['name']],
                ['description' => $permission['description']]
            );
        }
    
    }
}
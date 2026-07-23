<?php

namespace Database\Seeders;

use App\Models\ReadingCategory;
use Illuminate\Database\Seeder;

class ReadingCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Conductivity / التوصيلية الكهربائية',
                'sort_order' => 1,
            ],
            [
                'name' => 'Water Flow Rate / معدل تدفق المياه',
                'sort_order' => 2,
            ],
            [
                'name' => 'Pressure / الضغط',
                'sort_order' => 3,
            ],
            [
                'name' => 'Electrical Reading / القراءات الكهربائية',
                'sort_order' => 4,
            ],
        ];



        foreach ($categories as $category) {
            ReadingCategory::updateOrCreate(
                [
                    'company_id' => null,
                    'name' => $category['name'],
                ],
                [
                    'station_id' => null,
                    'ro_unit_id' => null,
                    'is_active' => true,
                    'sort_order' => $category['sort_order'],
                ]
            );
        }
    }
}
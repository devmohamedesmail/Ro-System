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
                'order' => 1,
            ],
            [
                'name' => 'Water Flow Rate / معدل تدفق المياه',
                'order' => 2,
            ],
            [
                'name' => 'Pressure / الضغط',
                'order' => 3,
            ],
            [
                'name' => 'Electrical Reading / القراءات الكهربائية',
                'order' => 4,
            ],
            [
                'name' => 'Water Quality / جودة المياه',
                'order' => 5,
            ],
            [
                'name' => 'Chemical Dosing / الجرعات الكيميائية',
                'order' => 6,
            ],
            [
                'name' => 'Tank Levels / مستويات الخزانات',
                'order' => 7,
            ],
            [
                'name' => 'Pump Status / حالة المضخات',
                'order' => 8,
            ],
            [
                'name' => 'Membrane Performance / أداء الأغشية',
                'order' => 9,
            ],
            [
                'name' => 'Temperature / درجة الحرارة',
                'order' => 10,
            ],
        ];



        foreach ($categories as $category) {
            ReadingCategory::updateOrCreate(
                [
                    'company_id' => null,
                    'name' => $category['name'],
                    // 'is_active' => true,
                    'order' => $category['order'],
                ],
                // [
                //     'station_id' => null,
                //     'ro_unit_id' => null,
                //     'is_active' => true,
                //     'sort_order' => $category['sort_order'],
                // ]
            );
        }
    }
}
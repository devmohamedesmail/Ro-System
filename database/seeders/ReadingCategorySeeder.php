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
                'name' => 'Production / الإنتاج',
                'order' => 1,
            ],
            [
                'name' => 'Consumption / الاستهلاك',
                'order' => 2,
            ],
            [
                'name' => 'Conductivity / التوصيلية الكهربائية',
                'order' => 3,
            ],
            [
                'name' => 'Water Flow Rate / معدل تدفق المياه',
                'order' => 4,
            ],
            [
                'name' => 'Pressure / الضغط',
                'order' => 5,
            ],
            [
                'name' => 'Electrical Reading / القراءات الكهربائية',
                'order' => 6,
            ],
            [
                'name' => 'Water Quality / جودة المياه',
                'order' => 7,
            ],
            [
                'name' => 'Chemical Dosing / الجرعات الكيميائية',
                'order' => 8,
            ],
            [
                'name' => 'Tank Levels / مستويات الخزانات',
                'order' => 9,
            ],
            [
                'name' => 'Pump Status / حالة المضخات',
                'order' => 10,
            ],
            [
                'name' => 'Membrane Performance / أداء الأغشية',
                'order' => 11,
            ],
            [
                'name' => 'Temperature / درجة الحرارة',
                'order' => 12,
            ],
        ];


        foreach ($categories as $category) {
            ReadingCategory::updateOrCreate(
                [
                    'company_id' => null,
                    'name' => $category['name'],
                ],
                [
                    'order' => $category['order'],
                ]
            );
        }
    
    }
}
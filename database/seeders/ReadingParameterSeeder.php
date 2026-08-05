<?php

namespace Database\Seeders;

use App\Models\ReadingCategory;
use App\Models\ReadingParameter;
use Illuminate\Database\Seeder;

class ReadingParameterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $parameters = [
           'Production / الإنتاج' => [
        ['name'=>'Running Hours / عدد ساعات التشغيل','code'=>'RUNNING_HOURS','unit'=>'hr','usage'=>'DAILY_REPORT'],
        ['name'=>'Water Production / المياه المنتجة','code'=>'WATER_PRODUCTION','unit'=>'m³','usage'=>'DAILY_REPORT'],
        ['name'=>'Client Consumption / استهلاك العميل','code'=>'CLIENT_CONSUMPTION','unit'=>'m³','usage'=>'DAILY_REPORT'],
        ['name'=>'Power Consumption / استهلاك الكهرباء','code'=>'POWER_CONSUMPTION','unit'=>'kW','usage'=>'DAILY_REPORT'],
        ['name'=>'Outside Sales / المبيعات الخارجية','code'=>'OUTSIDE_SALES','unit'=>'m³','usage'=>'DAILY_REPORT'],
        ['name'=>'Network Sales / مبيعات الشبكة','code'=>'NETWORK_SALES','unit'=>'m³','usage'=>'DAILY_REPORT'],
    ],

    'Consumption / الاستهلاك' => [
        ['name'=>'High Pressure Pump / مضخة الضغط العالي','code'=>'HIGH_PRESSURE_PUMP','unit'=>'kW','usage'=>'DAILY_REPORT'],
        ['name'=>'Booster Pump / مضخة البوستر','code'=>'BOOSTER_PUMP','unit'=>'kW','usage'=>'DAILY_REPORT'],
        ['name'=>'Specific Power / معدل استهلاك الطاقة','code'=>'SPECIFIC_POWER','unit'=>'kWh/m³','usage'=>'DAILY_REPORT'],
    ],

    'Conductivity / التوصيلية الكهربائية' => [
        ['name'=>'CF Feed Conductivity / موصلية تغذية الفلتر الكربوني','code'=>'CF_FEED_CONDUCTIVITY','unit'=>'µS/cm','usage'=>'BOTH'],
        ['name'=>'PX Feed Conductivity / موصلية تغذية PX','code'=>'PX_FEED_CONDUCTIVITY','unit'=>'µS/cm','usage'=>'BOTH'],
        ['name'=>'Membrane Feed Conductivity / موصلية تغذية الأغشية','code'=>'MEMBRANE_FEED_CONDUCTIVITY','unit'=>'µS/cm','usage'=>'BOTH'],
        ['name'=>'Membrane Reject Conductivity / موصلية صرف الأغشية','code'=>'MEMBRANE_REJECT_CONDUCTIVITY','unit'=>'µS/cm','usage'=>'BOTH'],
        ['name'=>'Drain Conductivity / موصلية المصرف','code'=>'DRAIN_CONDUCTIVITY','unit'=>'µS/cm','usage'=>'BOTH'],
        ['name'=>'Product TDS / أملاح مياه الإنتاج','code'=>'PRODUCT_TDS','unit'=>'ppm','usage'=>'BOTH'],
        ['name'=>'Temperature / درجة الحرارة','code'=>'TEMPERATURE','unit'=>'°C','usage'=>'BOTH'],
        ['name'=>'Feed pH / الأس الهيدروجيني لمياه التغذية','code'=>'FEED_PH','unit'=>'pH','usage'=>'BOTH'],
    ],

    'Water Flow Rate / معدل تدفق المياه' => [
        ['name'=>'Feed Flowrate / معدل تدفق مياه التغذية','code'=>'FEED_FLOWRATE','unit'=>'m³/hr','usage'=>'BOTH'],
        ['name'=>'HPP Feed Flowrate / معدل تدفق تغذية HPP','code'=>'HPP_FEED_FLOWRATE','unit'=>'m³/hr','usage'=>'BOTH'],
        ['name'=>'PX Feed Flowrate / معدل تدفق تغذية PX','code'=>'PX_FEED_FLOWRATE','unit'=>'m³/hr','usage'=>'BOTH'],
        ['name'=>'Reject Flowrate / معدل تدفق مياه الصرف','code'=>'REJECT_FLOWRATE','unit'=>'m³/hr','usage'=>'BOTH'],
        ['name'=>'Permeate Flowrate / معدل تدفق مياه الإنتاج','code'=>'PERMEATE_FLOWRATE','unit'=>'m³/hr','usage'=>'BOTH'],
        ['name'=>'Recovery / نسبة الاسترداد','code'=>'RECOVERY','unit'=>'%','usage'=>'BOTH'],
    ],

    'Pressure / الضغط' => [
        ['name'=>'MMF In Pressure / دخول الفلتر الرملي','code'=>'MMF_IN_PRESSURE','unit'=>'psi','usage'=>'BOTH'],
        ['name'=>'MMF Out Pressure / خروج الفلتر الرملي','code'=>'MMF_OUT_PRESSURE','unit'=>'psi','usage'=>'BOTH'],
        ['name'=>'MMF Pressure Drop / فرق ضغط الفلتر الرملي','code'=>'MMF_PRESSURE_DROP','unit'=>'psi','usage'=>'BOTH'],
        ['name'=>'CF In Pressure / دخول الفلتر الكربوني','code'=>'CF_IN_PRESSURE','unit'=>'psi','usage'=>'BOTH'],
        ['name'=>'CF Out Pressure / خروج الفلتر الكربوني','code'=>'CF_OUT_PRESSURE','unit'=>'psi','usage'=>'BOTH'],
        ['name'=>'CF Pressure Drop / فرق ضغط الفلتر الكربوني','code'=>'CF_PRESSURE_DROP','unit'=>'psi','usage'=>'BOTH'],
        ['name'=>'Membrane In Pressure / دخول الأغشية','code'=>'MEMBRANE_IN_PRESSURE','unit'=>'psi','usage'=>'BOTH'],
        ['name'=>'Membrane Out Pressure / خروج الأغشية إلى PX','code'=>'MEMBRANE_OUT_PRESSURE','unit'=>'psi','usage'=>'BOTH'],
        ['name'=>'Membrane Pressure Drop / فرق ضغط الأغشية','code'=>'MEMBRANE_PRESSURE_DROP','unit'=>'psi','usage'=>'BOTH'],
        ['name'=>'Booster Pump In Pressure / دخول طلمبة البوستر','code'=>'BOOSTER_PUMP_IN_PRESSURE','unit'=>'psi','usage'=>'BOTH'],
        ['name'=>'Drain Pressure / ضغط المصرف','code'=>'DRAIN_PRESSURE','unit'=>'psi','usage'=>'BOTH'],
    ],

    'Electrical Reading / القراءات الكهربائية' => [
        ['name'=>'Voltage / الجهد الكهربائي','code'=>'VOLTAGE','unit'=>'Volt','usage'=>'BOTH'],
        ['name'=>'HPP Amperes / أمبير مضخة الضغط العالي','code'=>'HPP_AMPERES','unit'=>'Amp','usage'=>'BOTH'],
        ['name'=>'HPP Frequency / تردد مضخة الضغط العالي','code'=>'HPP_FREQUENCY','unit'=>'Hz','usage'=>'BOTH'],
        ['name'=>'HPP Speed / سرعة مضخة الضغط العالي','code'=>'HPP_SPEED','unit'=>'RPM','usage'=>'BOTH'],
        ['name'=>'Booster Amperes / أمبير البوستر','code'=>'BOOSTER_AMPERES','unit'=>'Amp','usage'=>'BOTH'],
        ['name'=>'Booster Frequency / تردد البوستر','code'=>'BOOSTER_FREQUENCY','unit'=>'Hz','usage'=>'BOTH'],
        ['name'=>'Booster Speed / سرعة البوستر','code'=>'BOOSTER_SPEED','unit'=>'RPM','usage'=>'BOTH'],
    ],

        ];

       foreach ($parameters as $categoryName => $items) {

    $category = ReadingCategory::where('company_id', null)
        ->where('name', $categoryName)
        ->first();

    if (! $category) {
        continue;
    }

    foreach ($items as $index => $parameter) {

        ReadingParameter::updateOrCreate(
            [
                'reading_category_id' => $category->id,
                'code' => $parameter['code'],
            ],
            [
                'name' => $parameter['name'],
                'unit' => $parameter['unit'],
                'usage' => $parameter['usage'],
                'order' => $index + 1,
            ]
        );
    }
}
    }
}
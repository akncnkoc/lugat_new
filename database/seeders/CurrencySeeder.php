<?php

namespace Database\Seeders;

use App\Services\Currency\Models\Currency;
use App\Services\Setting\Models\GeneralSettings;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app(GeneralSettings::class)->defaultCurrency = Currency::firstWhere('code', 'TRY')->id;
        app(GeneralSettings::class)->save();
    }
}

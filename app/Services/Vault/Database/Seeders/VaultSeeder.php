<?php

namespace App\Services\Vault\Database\Seeders;

use App\Services\Currency\Http\Controllers\CurrencyController;
use App\Services\Currency\Models\Currency;
use App\Services\Vault\Models\Vault;
use Illuminate\Database\Seeder;

class VaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        (new CurrencyController)->loadCurrenciesFromTCMB();
        foreach (Currency::all() as $currency) {
            Vault::create([
                'name'        => $currency->code.' Vault',
                'currency_id' => $currency->id,
            ]);
        }
    }
}

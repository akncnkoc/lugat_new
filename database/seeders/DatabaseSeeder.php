<?php

namespace Database\Seeders;

use App\Services\Currency\Http\Controllers\CurrencyController;
use App\Services\Expense\Database\Seeders\ExpenseSeeder;
use App\Services\User\Database\Seeders\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        (new CurrencyController)->loadCurrenciesFromTCMB();
        $this->call([
            ExpenseSeeder::class,
            UserSeeder::class,
        ]);
    }
}

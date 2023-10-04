<?php

namespace Database\Seeders;

use App\Services\Currency\Http\Controllers\CurrencyController;
use App\Services\Customer\Database\Seeders\CustomerSeeder;
use App\Services\Expense\Database\Seeders\ExpenseSeeder;
use App\Services\Invoice\Database\Seeders\InvoiceSeeder;
use App\Services\Product\Database\Seeders\ProductSeeder;
use App\Services\Staff\Database\Seeders\StaffSeeder;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\Vault\Database\Seeders\VaultSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            VaultSeeder::class,
            ExpenseSeeder::class,
            UserSeeder::class,
            CustomerSeeder::class,
            StaffSeeder::class,
            ProductSeeder::class
        ]);
    }
}

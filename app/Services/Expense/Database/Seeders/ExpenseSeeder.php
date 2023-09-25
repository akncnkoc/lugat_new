<?php

namespace App\Services\Expense\Database\Seeders;

use App\Services\Expense\Models\Expense;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Expense::factory(100)->create();
    }
}

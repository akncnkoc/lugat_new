<?php

namespace App\Services\Expense\Database\Seeders;

use App\Services\Expense\Models\ExpenseType;
use Illuminate\Database\Seeder;

class ExpenseTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ExpenseType::factory()->create();
    }
}

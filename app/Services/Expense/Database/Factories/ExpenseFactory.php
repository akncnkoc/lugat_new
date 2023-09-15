<?php

namespace App\Services\Expense\Database\Factories;

use App\Services\Expense\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Expense\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    protected $model = Expense::class;
    public function definition(): array
    {
        return [
            //
        ];
    }
}

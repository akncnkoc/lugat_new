<?php

namespace App\Services\Expense\Database\Factories;

use App\Services\Currency\Models\Currency;
use App\Services\Expense\Enums\ExpenseType;
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
            'amount'       => $this->faker->numberBetween(1, 50),
            'currency_id'  => Currency::inRandomOrder()->first(),
            'comment'      => $this->faker->sentence,
            'receipt_date' => $this->faker->dateTimeBetween('-2 month'),
            'type'         => $this->faker->randomElement(ExpenseType::cases())->value,
        ];
    }
}

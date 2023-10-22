<?php

namespace App\Services\Expense\Database\Factories;

use App\Services\Currency\Models\Currency;
use App\Services\Expense\Enums\ExpenseStatus;
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
        $status = $this->faker->randomElement(ExpenseStatus::cases())->value;
        return [
            'amount' => $this->faker->numberBetween(1, 50),
            'currency_id' => Currency::inRandomOrder()->first(),
            'comment' => $this->faker->sentence,
            'receipt_date' => $status === 'paided' ? $this->faker->dateTimeBetween('-2 month') : null,
            'type' => $this->faker->randomElement(ExpenseType::cases())->value,
            'status' => $status,
            'scheduled_date' => $status === 'scheduled' ? $this->faker->dateTimeBetween('now', '+2 months') : null,
        ];
    }
}

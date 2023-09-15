<?php

namespace App\Services\Currency\Database\Factories;

use App\Services\Currency\Models\Currency;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CurrencyFactory extends Factory
{
    protected $model = Currency::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->currencyCode,
            'code' => $this->faker->currencyCode,
            'primary' => $this->faker->boolean(),
            'banknote_buy' => 1,
            'banknote_sell' => 1,
            'forex_buy' => 1,
            'forex_sell' => 1
        ];
    }
}

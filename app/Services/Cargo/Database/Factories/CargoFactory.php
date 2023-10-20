<?php

namespace App\Services\Cargo\Database\Factories;

use App\Services\Cargo\Enums\AmountType;
use App\Services\Cargo\Enums\CargoType;
use App\Services\Cargo\Models\Cargo;
use App\Services\Cargo\Models\CargoCompany;
use App\Services\Currency\Models\Currency;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Cargo\Models\Cargo>
 */
class CargoFactory extends Factory
{
    protected $model = Cargo::class;
    public function definition(): array
    {
        return [
            'cargo_company_id' => CargoCompany::factory(),
            'type' => $this->faker->randomElement(CargoType::values()),
            'tracking_no' => $this->faker->uuid(),
            'amount_type' => $this->faker->randomElement(AmountType::values()),
            'price' => $this->faker->numberBetween(100, 250),
            'price_currency_id' => Currency::inRandomOrder()->first(),
            'date_of_paid' => $this->faker->date()
        ];
    }
}

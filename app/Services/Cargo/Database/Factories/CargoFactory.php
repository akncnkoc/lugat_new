<?php

namespace App\Services\Cargo\Database\Factories;

use App\Services\Cargo\Enums\AmountType;
use App\Services\Cargo\Enums\CargoType;
use App\Services\Cargo\Models\Cargo;
use App\Services\Cargo\Models\CargoCompany;
use App\Services\Currency\Models\Currency;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Cargo\Models\Cargo>
 */
class CargoFactory extends Factory
{
    protected $model = Cargo::class;
    public function definition(): array
    {
        $type = $this->faker->randomElement(CargoType::values());
        list($ready_to_ship_date, $shipped_date, $delivered_date, $returned_date) = [null, null, null, null];
        switch ($type) {
            case 'ready_to_ship':
                $ready_to_ship_date = $this->faker->dateTimeBetween('-2 days');
                break;
            case 'shipped':
                $shipped_date = Carbon::make($this->faker->dateTimeBetween('-4 days'));
                $ready_to_ship_date = $shipped_date->subDay();
                break;
            case 'delivered':
                $delivered_date = Carbon::make($this->faker->dateTimeBetween('-7 days'));
                $shipped_date = $delivered_date->subDays(3);
                $ready_to_ship_date = $shipped_date->subDay();
                break;
            case 'returned':
                $returned_date = Carbon::make($this->faker->dateTimeBetween('-7 days'));
                $shipped_date = $returned_date->subDays(3);
                $ready_to_ship_date = $shipped_date->subDay();
                break;
        }
        return [
            'cargo_company_id' => CargoCompany::inRandomOrder()->first()->id,
            'type' => $type,
            'tracking_no' => $ready_to_ship_date != null ? $this->faker->isbn10() : '',
            'amount' => (string) $this->faker->numberBetween(10, 20),
            'amount_type' => $this->faker->randomElement(AmountType::values()),
            'price' => $this->faker->numberBetween(100, 250),
            'price_currency_id' => Currency::inRandomOrder()->first(),
            'ready_to_ship_date' => $ready_to_ship_date,
            'shipped_date' => $shipped_date,
            'delivered_date' => $delivered_date,
            'returned_date' => $returned_date,
        ];
    }
}

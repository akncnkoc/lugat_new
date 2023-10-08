<?php

namespace App\Services\Staff\Database\Factories;

use App\Services\Currency\Models\Currency;
use App\Services\Staff\Enums\StaffType;
use App\Services\Staff\Models\Staff;
use App\Services\Vault\Models\Vault;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Staff\Models\Staff>
 */
class StaffFactory extends Factory
{
    protected $model = Staff::class;

    public function definition(): array
    {
        return [
            'name'            => $this->faker->name,
            'surname'         => $this->faker->lastName,
            'phone'           => $this->faker->phoneNumber,
            'type'            => $this->faker->randomElement(StaffType::values()),
            'email'           => $this->faker->email,
            'salary'          => $this->faker->numberBetween(1000, 10000),
            'salary_currency_id' => Currency::inRandomOrder()->first()
        ];
    }
}

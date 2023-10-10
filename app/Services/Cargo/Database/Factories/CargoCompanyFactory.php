<?php

namespace App\Services\Cargo\Database\Factories;

use App\Services\Cargo\Models\CargoCompany;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Cargo\Models\CargoCompany>
 */
class CargoCompanyFactory extends Factory
{
    protected $model = CargoCompany::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company
        ];
    }
}

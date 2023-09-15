<?php

namespace App\Services\Customer\Database\Factories;

use App\Services\Customer\Models\CustomerType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Customer\Models\CustomerType>
 */
class CustomerTypeFactory extends Factory
{
    protected $model = CustomerType::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(4, 4),
        ];
    }
}

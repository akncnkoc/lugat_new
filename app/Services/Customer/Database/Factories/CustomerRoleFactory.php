<?php

namespace App\Services\Customer\Database\Factories;

use App\Services\Customer\Models\CustomerRole;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Customer\Models\CustomerRole>
 */
class CustomerRoleFactory extends Factory
{
    protected $model = CustomerRole::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(4, 4),
        ];
    }
}

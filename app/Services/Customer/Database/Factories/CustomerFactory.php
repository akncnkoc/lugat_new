<?php

namespace App\Services\Customer\Database\Factories;

use App\Services\Customer\Models\Customer;
use App\Services\Customer\Models\CustomerRole;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Customer\Models\Customer>
 */
class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition(): array
    {
        return [
            'name'             => $this->faker->name,
            'surname'          => $this->faker->lastName,
            'email'            => $this->faker->email,
            'phone'            => $this->faker->phoneNumber,
            'city'             => $this->faker->city,
            'district'         => $this->faker->colorName,
            'neighborhood'     => $this->faker->colorName,
            'address'          => $this->faker->address,
            'post_code'        => $this->faker->postcode,
            'comment'          => $this->faker->sentence,
            'gender'           => $this->faker->boolean(),
            'customer_role_id' => CustomerRole::factory()->create()->id
        ];
    }
}

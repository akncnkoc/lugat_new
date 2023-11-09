<?php

namespace App\Services\Customer\Database\Factories;

use App\Services\Customer\Models\CustomerShippingAddress;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Customer\Models\CustomerShippingAddress>
 */
class CustomerShippingAddressFactory extends Factory
{

    protected $model = CustomerShippingAddress::class;
    public function definition(): array
    {
        return [
            //
        ];
    }
}

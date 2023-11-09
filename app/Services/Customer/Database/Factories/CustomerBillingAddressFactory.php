<?php

namespace App\Services\Customer\Database\Factories;

use App\Services\Customer\Models\CustomerBillingAddress;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Customer\Models\CustomerBillingAddress>
 */
class CustomerBillingAddressFactory extends Factory
{
    protected $model = CustomerBillingAddress::class;
    public function definition(): array
    {
        return [
            //
        ];
    }
}

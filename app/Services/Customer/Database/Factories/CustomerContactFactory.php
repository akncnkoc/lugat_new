<?php

namespace App\Services\Customer\Database\Factories;

use App\Services\Customer\Models\CustomerContact;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Customer\Models\CustomerContact>
 */
class CustomerContactFactory extends Factory
{
    protected $model = CustomerContact::class;
    public function definition(): array
    {
        return [
            //
        ];
    }
}

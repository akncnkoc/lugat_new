<?php

namespace App\Services\Customer\Database\Factories;

use App\Services\Customer\Models\CustomerInfo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Customer\Models\CustomerInfo>
 */
class CustomerInfoFactory extends Factory
{
    protected $model = CustomerInfo::class;
    public function definition(): array
    {
        return [
            //
        ];
    }
}

<?php

namespace App\Services\Vault\Database\Factories;

use App\Services\Vault\Models\Vault;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Vault\Models\Safe>
 */
class VaultFactory extends Factory
{
    protected $model = Vault::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->domainName,
            'currency_id' => ''
        ];
    }
}

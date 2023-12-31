<?php

namespace App\Services\Vault\Database\Factories;

use App\Services\Currency\Models\Currency;
use App\Services\Vault\Models\Vault;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Vault\Models\Vault>
 */
class VaultFactory extends Factory
{
    protected $model = Vault::class;

    public function definition(): array
    {
        return [];
    }
}

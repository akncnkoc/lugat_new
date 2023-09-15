<?php

namespace App\Services\Product\Database\Factories;

use App\Services\Product\Models\Product;
use App\Services\Vault\Models\Vault;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Product\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'model_code' => $this->faker->postcode,
            'buy_price' => $this->faker->numberBetween(100, 200),
            'buy_price_vault_id' => Vault::factory(),
            'sell_price' => $this->faker->numberBetween(100, 200),
            'sell_price_vault_id' => Vault::factory(),
        ];
    }
}

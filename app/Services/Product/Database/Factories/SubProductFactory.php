<?php

namespace App\Services\Product\Database\Factories;

use App\Services\Currency\Models\Currency;
use App\Services\Product\Models\Product;
use App\Services\Product\Models\SubProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Product\Models\SubProduct>
 */
class SubProductFactory extends Factory
{
    protected $model = SubProduct::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'sku' => $this->faker->name,
            'barcode' => $this->faker->name,
            'buy_price' => $this->faker->numberBetween(1, 200),
            'buy_currency_id' => Currency::inRandomOrder()->first()->id,
            'sell_price' => $this->faker->numberBetween(1, 200),
            'sell_currency_id' => Currency::inRandomOrder()->first()->id,
            'product_id' => Product::factory(),
            'stock' => $this->faker->numberBetween(10, 20),
            'tax' => 0
        ];
    }
}

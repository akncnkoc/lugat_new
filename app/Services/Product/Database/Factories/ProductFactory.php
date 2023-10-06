<?php

namespace App\Services\Product\Database\Factories;

use App\Services\Product\Models\Product;
use Bezhanov\Faker\ProviderCollectionHelper;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Product\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        ProviderCollectionHelper::addAllProvidersTo($this->faker);
        return [
            'name' => $this->faker->productName,
        ];
    }
}

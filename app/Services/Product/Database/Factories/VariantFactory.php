<?php

namespace App\Services\Product\Database\Factories;

use App\Services\Product\Models\Variant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Product\Models\Variant>
 */
class VariantFactory extends Factory
{
    protected $model = Variant::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(1)
        ];
    }
}

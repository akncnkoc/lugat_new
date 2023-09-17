<?php

namespace App\Services\Product\Database\Factories;

use App\Services\Product\Models\ProductSupplier;
use App\Services\Supplier\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductSupplierFactory extends Factory
{
    protected $model = ProductSupplier::class;

    public function definition(): array
    {
        return [
            'supplier_id' => Supplier::factory()
        ];
    }
}

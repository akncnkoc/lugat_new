<?php

namespace App\Services\Product\Database\Seeders;

use App\Services\Product\Models\Product;
use App\Services\Product\Models\SubProductImage;
use App\Services\Product\Models\ProductSupplier;
use App\Services\Supplier\Models\Supplier;
use Illuminate\Database\Seeder;

class ProductWithSuppliersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory()
               ->has(Supplier::factory())
               ->has(ProductSupplier::factory())
               ->create();
    }
}

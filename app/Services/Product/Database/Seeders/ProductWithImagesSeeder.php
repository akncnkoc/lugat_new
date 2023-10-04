<?php

namespace App\Services\Product\Database\Seeders;

use App\Services\Product\Models\Product;
use App\Services\Product\Models\SubProductImage;
use Illuminate\Database\Seeder;

class ProductWithImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory()
               ->has(SubProductImage::factory())
               ->create();
    }
}

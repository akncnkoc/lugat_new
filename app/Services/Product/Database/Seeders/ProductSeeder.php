<?php

namespace App\Services\Product\Database\Seeders;

use App\Services\Currency\Models\Currency;
use App\Services\Product\Models\Product;
use App\Services\Product\Models\SubProduct;
use App\Services\Product\Models\SubProductVariant;
use App\Services\Product\Models\Variant;
use Exception;
use Faker\Factory;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * @throws Exception
     */
    public function run(): void
    {
        $faker = Factory::create();
        Variant::factory(10)->create();
        Product::factory(10)->has(SubProduct::factory(random_int(3, 5))->state(function (array $attrs, Product $product) use ($faker) {
            $variant = Variant::inRandomOrder()->first();
            $buyPrice = random_int(100, 200);
            $sellPrice = $buyPrice - ($buyPrice * 0.3);
            $currency_id = Currency::inRandomOrder()->first()->id;

            return [
                'name'             => $product->name.' '.$variant->name,
                'buy_price'        => $buyPrice,
                'sku'              => $faker->postcode,
                'barcode'          => $faker->postcode,
                'sell_price'       => $sellPrice,
                'buy_currency_id'  => $currency_id,
                'sell_currency_id' => $currency_id,
                'product_id'       => $product->id,
                'stock'            => random_int(1, 10),
                'tax'              => 1,
            ];
        })->has(SubProductVariant::factory()->state(function (array $attrs, SubProduct $subProduct) {
            $variant = Variant::inRandomOrder()->first();
            return [
                'variant_id'     => $variant->id,
                'sub_product_id' => $subProduct->id
            ];
        }), 'subProductVariants'), 'subProducts')
               ->hasProductSuppliers(random_int(1, 3))
               ->create();
    }
}

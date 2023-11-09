<?php

namespace App\Services\Invoice\Database\Factories;

use App\Services\Currency\Models\Currency;
use App\Services\Invoice\Models\InvoiceProduct;
use App\Services\Invoice\Traits\TaxType;
use App\Services\Product\Models\SubProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Invoice\Models\InvoiceProduct>
 */
class InvoiceProductFactory extends Factory
{
    protected $model = InvoiceProduct::class;

    public function definition(): array
    {
        return [
            'tax' => $this->faker->randomElement(TaxType::values()),
            'price' => $this->faker->numberBetween(50, 100),
            'price_currency_id' => Currency::inRandomOrder()->first()->id,
            'sub_product_id' => SubProduct::factory()
        ];
    }
}

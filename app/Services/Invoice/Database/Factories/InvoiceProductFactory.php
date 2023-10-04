<?php

namespace App\Services\Invoice\Database\Factories;

use App\Services\Invoice\Models\InvoiceProduct;
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
            //
        ];
    }
}

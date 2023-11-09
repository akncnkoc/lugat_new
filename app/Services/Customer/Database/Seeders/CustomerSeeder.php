<?php

namespace App\Services\Customer\Database\Seeders;

use App\Services\Customer\Models\Customer;
use App\Services\Invoice\Models\Invoice;
use Exception;
use Faker\Factory;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $invoiceProductCount = random_int(3, 5);
        $faker = Factory::create();
        Customer::factory(10)->has(
            Invoice::factory()->hasInvoiceProducts(
                $invoiceProductCount,
                function (array $attrs, Invoice $invoice) use ($invoiceProductCount, $faker) {
                    $price = $faker->numberBetween(10, 200);
                    return [
                        'price'     => $price,
                        'tax_price' => ($price * (($attrs['tax'] ?: 1) / 100))
                    ];
                }
            )
        )->create();
    }
}

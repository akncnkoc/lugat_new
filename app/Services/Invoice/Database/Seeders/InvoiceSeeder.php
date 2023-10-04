<?php

namespace App\Services\Invoice\Database\Seeders;

use App\Services\Invoice\Models\Invoice;
use Exception;
use Illuminate\Database\Seeder;

class InvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * @throws Exception
     */
    public function run(): void
    {
        $invoiceProductCount = random_int(3, 5);

        Invoice::factory()->hasInvoiceProducts($invoiceProductCount, function (array $attrs, Invoice $invoice) use ($invoiceProductCount) {
            return [
                'price'     => $invoice->total / $invoiceProductCount,
                'tax_price' => ($invoice->total / $invoiceProductCount) - (($invoice->total / $invoiceProductCount) * 100 / $attrs->tax)
            ];
        })->create();
    }
}

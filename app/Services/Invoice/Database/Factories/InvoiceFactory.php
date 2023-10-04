<?php

namespace App\Services\Invoice\Database\Factories;

use App\Services\Customer\Models\Customer;
use App\Services\Invoice\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Invoice\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    protected $model = Invoice::class;

    public function definition(): array
    {
        return [
            'description'  => $this->faker->sentence,
            'customer_id'  => Customer::factory(),
            'invoice_date' => $this->faker->dateTime(),
            'total'        => $this->faker->numberBetween(1000, 5000)
        ];
    }
}

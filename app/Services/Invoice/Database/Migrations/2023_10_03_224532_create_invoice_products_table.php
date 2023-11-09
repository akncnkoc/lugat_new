<?php

use App\Services\Invoice\Traits\TaxType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoice_products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('invoice_id')->constrained('invoices')->restrictOnDelete();
            $table->foreignUuid('sub_product_id')->constrained('sub_products')->restrictOnDelete();
            $table->decimal('price')->default(1);
            $table->foreignUuid('price_currency_id')->constrained('currencies')->restrictOnDelete();
            $table->enum('tax', TaxType::values());
            $table->decimal('tax_price')->default(0);
            $table->timestamps();
        });
    }
};

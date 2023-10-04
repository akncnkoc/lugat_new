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
            $table->foreignUuid('product_id')->constrained('products')->restrictOnDelete();
            $table->decimal('price', 15)->default(1);
            $table->foreignUuid('price_currency_id')->constrained('currencies')->restrictOnDelete();
            $table->enum('tax', TaxType::values());
            $table->timestamps();
        });
    }
};

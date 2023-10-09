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
        Schema::create('sub_products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('sku')->nullable();
            $table->string('barcode')->nullable();
            $table->decimal('buy_price', 15)->default(0);
            $table->decimal('sell_price', 15)->default(0);
            $table->foreignUuid('buy_currency_id')->nullable()->constrained('currencies')->restrictOnDelete();
            $table->foreignUuid('sell_currency_id')->constrained('currencies')->restrictOnDelete();
            $table->foreignUuid('product_id')->constrained('products')->restrictOnDelete();
            $table->unsignedDecimal('stock', 15)->default(0);
            $table->enum('tax', TaxType::values());
            $table->timestamps();
            $table->softDeletes();
        });
    }
};

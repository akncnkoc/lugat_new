<?php

use App\Services\Customer\Enums\CustomerPaymentTermType;
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
        Schema::create('customer_infos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('customers')->restrictOnDelete();
            $table->enum('tax_rate', TaxType::values())->nullable();
            $table->text('tax_number')->nullable();
            $table->text('tax_administration')->nullable();
            $table->enum('payment_terms', CustomerPaymentTermType::values())
                  ->default(CustomerPaymentTermType::DUE_ON_RECEIPT);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_infos');
    }
};

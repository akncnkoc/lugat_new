<?php

use App\Services\Cargo\Enums\AmountType;
use App\Services\Cargo\Enums\CargoType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cargos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('cargo_company_id')->constrained('cargo_companies')->restrictOnDelete();
            $table->enum('type', CargoType::values());
            $table->string('tracking_no')->nullable();
            $table->enum('amount_type', AmountType::values());
            $table->double('price')->default(0);
            $table->foreignUuid('price_currency_id')->nullable()->constrained('currencies')->restrictOnDelete();
            $table->dateTime('date_of_paid')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargos');
    }
};

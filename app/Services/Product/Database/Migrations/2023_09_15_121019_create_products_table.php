<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('model_code')->nullable();
            $table->decimal('buy_price', 15, 5)->default(1);
            $table->foreignUuid('buy_price_vault_id')->constrained('vaults')->restrictOnDelete();
            $table->decimal('sell_price', 15, 5)->default(1);
            $table->foreignUuid('sell_price_vault_id')->constrained('vaults')->restrictOnDelete();
            $table->boolean('critical_stock_alert')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }
};

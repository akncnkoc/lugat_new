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
        Schema::create('sub_product_variants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('sub_product_id')->constrained('sub_products')->cascadeOnDelete();
            $table->foreignUuid('variant_id')->constrained('variants')->cascadeOnDelete();
            $table->softDeletes();
        });
    }
};

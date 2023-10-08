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
        Schema::create('invoices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('customers')->restrictOnDelete();
            $table->dateTime('bill_date')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->decimal('total_amount')->default(0);
            $table->decimal('total_tax')->default(0);
            $table->decimal('total_discount')->default(0);
            $table->decimal('total', 15)->default(0);
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }
};

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
        Schema::create('expenses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('expense_type_id')->constrained('expense_types')->restrictOnDelete();
            $table->decimal('amount', 15);
            $table->foreignUuid('vault_id')->constrained('vaults')->restrictOnDelete();
            $table->string('comment')->nullable();
            $table->dateTime('receipt_date')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }
};

<?php

use App\Services\Expense\Enums\ExpenseStatus;
use App\Services\Expense\Enums\ExpenseType;
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
            $table->enum('type', ExpenseType::values());
            $table->decimal('amount');
            $table->foreignUuid('currency_id')->constrained('currencies')->restrictOnDelete();
            $table->string('comment')->nullable();
            $table->dateTimeTz('receipt_date')->nullable();
            $table->dateTimeTz('scheduled_date')->nullable();
            $table->enum('status', ExpenseStatus::values());
            $table->timestampsTz();
            $table->softDeletesTz();
        });
    }
};

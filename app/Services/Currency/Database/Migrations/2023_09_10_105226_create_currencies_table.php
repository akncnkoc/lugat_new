<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('currencies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->integer('unit')->default(1);
            $table->string('code')->nullable();
            $table->decimal('forex_buy', 15, 5);
            $table->decimal('forex_sell', 15, 5);
            $table->decimal('banknote_buy', 15, 5);
            $table->decimal('banknote_sell', 15, 5);
            $table->boolean('primary')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('currencies');
    }
};

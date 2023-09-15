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
        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->text('name');
            $table->text('surname');
            $table->text('email');
            $table->text('phone');
            $table->text('city')->nullable();
            $table->text('district')->nullable();
            $table->text('neighborhood')->nullable();
            $table->longText('address')->nullable();
            $table->text('post_code')->nullable();
            $table->text('comment')->nullable();
            $table->integer('gender')->default(true);
            $table->foreignUuid('customer_type_id')->constrained('customer_types')->restrictOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }
};

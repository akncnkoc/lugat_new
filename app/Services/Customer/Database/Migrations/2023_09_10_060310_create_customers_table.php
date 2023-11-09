<?php

use App\Services\Customer\Enums\CustomerType;
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
            $table->text('official_name')->nullable();
            $table->enum('type', CustomerType::values());
            $table->timestamps();
            $table->softDeletes();
        });
    }
};

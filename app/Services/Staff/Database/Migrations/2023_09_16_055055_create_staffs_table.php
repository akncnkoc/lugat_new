<?php

use App\Services\Staff\Enums\StaffType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('staffs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('surname');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->decimal('salary', 15, 5)->default(0);
            $table->foreignUuid('salary_vault_id')->nullable()->constrained('vaults')->restrictOnDelete();
            $table->enum('type', StaffType::values());
            $table->timestamps();
            $table->softDeletes();
        });
    }
};
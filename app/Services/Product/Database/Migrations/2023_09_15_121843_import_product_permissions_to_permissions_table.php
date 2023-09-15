<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('permissions')->insert([
            [
                'id' => Str::uuid(),
                'name' => 'view product',
                'guard_name' => 'web',
                'type' => 'product'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'store product',
                'guard_name' => 'web',
                'type' => 'product'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'update product',
                'guard_name' => 'web',
                'type' => 'product'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'delete product',
                'guard_name' => 'web',
                'type' => 'product'
            ],
        ]);
    }
};

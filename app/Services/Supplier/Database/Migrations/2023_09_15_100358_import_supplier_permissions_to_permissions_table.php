<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('permissions')->insert([
            [
                'id' => Str::uuid(),
                'name' => 'view supplier',
                'guard_name' => 'web',
                'type' => 'supplier'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'store supplier',
                'guard_name' => 'web',
                'type' => 'supplier'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'update supplier',
                'guard_name' => 'web',
                'type' => 'supplier'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'delete supplier',
                'guard_name' => 'web',
                'type' => 'supplier'
            ],
        ]);
    }
};

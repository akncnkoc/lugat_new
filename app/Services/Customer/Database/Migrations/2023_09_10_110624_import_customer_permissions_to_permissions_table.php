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
                'name' => 'view customer',
                'guard_name' => 'web',
            ],
            [
                'id' => Str::uuid(),
                'name' => 'store customer',
                'guard_name' => 'web',
            ],
            [
                'id' => Str::uuid(),
                'name' => 'update customer',
                'guard_name' => 'web',
            ],
            [
                'id' => Str::uuid(),
                'name' => 'delete customer',
                'guard_name' => 'web',
            ],

            [
                'id' => Str::uuid(),
                'name' => 'view customer role',
                'guard_name' => 'web',
            ],
            [
                'id' => Str::uuid(),
                'name' => 'store customer role',
                'guard_name' => 'web',
            ],
            [
                'id' => Str::uuid(),
                'name' => 'update customer role',
                'guard_name' => 'web',
            ],
            [
                'id' => Str::uuid(),
                'name' => 'delete customer role',
                'guard_name' => 'web',
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('permissions')->where('guard_name', 'customer')->delete();
    }
};

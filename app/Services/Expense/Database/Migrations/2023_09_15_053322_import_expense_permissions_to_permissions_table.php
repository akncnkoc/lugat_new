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
                'name' => 'view expense',
                'guard_name' => 'web',
                'type' => 'expense'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'store expense',
                'guard_name' => 'web',
                'type' => 'expense'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'update expense',
                'guard_name' => 'web',
                'type' => 'expense'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'delete expense',
                'guard_name' => 'web',
                'type' => 'expense'
            ],

            [
                'id' => Str::uuid(),
                'name' => 'view expense type',
                'guard_name' => 'web',
                'type' => 'expense-type'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'store expense type',
                'guard_name' => 'web',
                'type' => 'expense-type'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'update expense type',
                'guard_name' => 'web',
                'type' => 'expense-type'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'delete expense type',
                'guard_name' => 'web',
                'type' => 'expense-type'
            ],
        ]);
    }
};

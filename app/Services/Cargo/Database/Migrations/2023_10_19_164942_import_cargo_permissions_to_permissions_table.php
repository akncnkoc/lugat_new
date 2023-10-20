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
                'name' => 'view cargo',
                'guard_name' => 'web',
                'type' => 'cargo'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'store cargo',
                'guard_name' => 'web',
                'type' => 'cargo'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'update cargo',
                'guard_name' => 'web',
                'type' => 'cargo'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'delete cargo',
                'guard_name' => 'web',
                'type' => 'cargo'
            ],
        ]);
    }
};

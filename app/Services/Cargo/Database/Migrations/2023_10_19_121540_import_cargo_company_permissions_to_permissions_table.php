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
                'name' => 'view cargo company',
                'guard_name' => 'web',
                'type' => 'cargo_company'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'store cargo company',
                'guard_name' => 'web',
                'type' => 'cargo_company'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'update cargo company',
                'guard_name' => 'web',
                'type' => 'cargo_company'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'delete cargo company',
                'guard_name' => 'web',
                'type' => 'cargo_company'
            ],
        ]);
    }
};

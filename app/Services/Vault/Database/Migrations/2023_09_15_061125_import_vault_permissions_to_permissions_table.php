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
                'name' => 'view vault',
                'guard_name' => 'web',
                'type' => 'vault'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'store vault',
                'guard_name' => 'web',
                'type' => 'vault'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'update vault',
                'guard_name' => 'web',
                'type' => 'vault'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'delete vault',
                'guard_name' => 'web',
                'type' => 'vault'
            ],
        ]);
    }
};

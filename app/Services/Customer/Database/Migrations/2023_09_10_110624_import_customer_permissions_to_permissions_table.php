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
        'name' => 'view customer',
        'guard_name' => 'web',
        'type' => 'customer'
      ],
      [
        'id' => Str::uuid(),
        'name' => 'store customer',
        'guard_name' => 'web',
        'type' => 'customer'
      ],
      [
        'id' => Str::uuid(),
        'name' => 'update customer',
        'guard_name' => 'web',
        'type' => 'customer'
      ],
      [
        'id' => Str::uuid(),
        'name' => 'delete customer',
        'guard_name' => 'web',
        'type' => 'customer'
      ],
    ]);
  }
};

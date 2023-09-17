<?php

namespace Database\Seeders;

use App\Services\Currency\Models\Currency;
use App\Services\Expense\Models\Expense;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
      Currency::factory()->create();
      Expense::factory(100)->create();
      $this->call([
          UserSeeder::class,
      ]);
  }
}

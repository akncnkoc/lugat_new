<?php

namespace Database\Seeders;

use App\Services\Currency\Models\Currency;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
      Currency::factory()->create();
  }
}

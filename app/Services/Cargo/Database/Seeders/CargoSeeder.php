<?php

namespace App\Services\Cargo\Database\Seeders;

use App\Services\Cargo\Models\Cargo;
use Illuminate\Database\Seeder;

class CargoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cargo::factory(10)->create();
    }
}

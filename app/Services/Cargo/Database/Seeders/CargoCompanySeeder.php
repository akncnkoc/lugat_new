<?php

namespace App\Services\Cargo\Database\Seeders;

use App\Services\Cargo\Models\CargoCompany;
use Illuminate\Database\Seeder;

class CargoCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CargoCompany::factory(10)->create();
    }
}

<?php

namespace App\Services\Supplier\Database\Seeders;

use App\Services\Supplier\Models\Supplier;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Supplier::factory(20)->create();
    }
}

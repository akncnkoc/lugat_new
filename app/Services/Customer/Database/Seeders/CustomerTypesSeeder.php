<?php

namespace App\Services\Customer\Database\Seeders;

use App\Services\Customer\Models\CustomerType;
use Illuminate\Database\Seeder;

class CustomerTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CustomerType::factory(5)->create();
    }
}

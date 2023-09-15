<?php

namespace App\Services\Customer\Database\Seeders;

use App\Services\Customer\Models\CustomerRole;
use Illuminate\Database\Seeder;

class CustomerRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CustomerRole::factory(5)->create();
    }
}

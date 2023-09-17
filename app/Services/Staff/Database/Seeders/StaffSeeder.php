<?php

namespace App\Services\Staff\Database\Seeders;

use App\Services\Staff\Models\Staff;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Staff::factory()->create();
    }
}

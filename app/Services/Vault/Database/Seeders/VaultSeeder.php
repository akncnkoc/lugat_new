<?php

namespace App\Services\Vault\Database\Seeders;

use App\Services\Vault\Models\Vault;
use Illuminate\Database\Seeder;

class VaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Vault::factory()->create();
    }
}

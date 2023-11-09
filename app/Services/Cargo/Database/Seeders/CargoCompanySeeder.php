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
        $cargoCompanies = [
            "MNG",
            "Aras",
            "Sürat",
            "Yurtiçi",
            "PTT",
            "Vatan",
            "UPS",
            "İyi",
            "Kargo Türk",
            "Git",
            "Aykargo",
            "DHL",
            "Trendyol Express",
            "Kargoist",
            "Rabbit"
        ];
        foreach ($cargoCompanies as $cargoCompany) {
            CargoCompany::create(['name' => $cargoCompany]);
        }
    }
}

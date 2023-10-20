<?php

namespace App\Services\Cargo\Models;

use App\Services\Cargo\Database\Factories\CargoCompanyFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CargoCompany extends Model
{
    use HasUuids, HasFactory, SoftDeletes;

    protected $guarded = [];

    protected static function newFactory(): CargoCompanyFactory
    {
        return CargoCompanyFactory::new();
    }
}

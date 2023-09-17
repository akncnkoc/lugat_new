<?php

namespace App\Services\Product\Models;

use App\Services\Product\Database\Factories\ProductSupplierFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSupplier extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [];

    protected static function newFactory(): ProductSupplierFactory
    {
        return ProductSupplierFactory::new();
    }
}

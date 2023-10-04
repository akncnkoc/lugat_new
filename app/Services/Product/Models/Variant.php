<?php

namespace App\Services\Product\Models;

use App\Services\Product\Database\Factories\VariantFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory, HasUuids;

    protected static function newFactory(): VariantFactory
    {
        return VariantFactory::new();
    }
}

<?php

namespace App\Services\Product\Models;

use App\Services\Product\Database\Factories\ProductFactory;
use App\Services\Supplier\Models\Supplier;
use App\Services\Vault\Models\Vault;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $guarded = [];
    protected $table = 'products';

    protected static function newFactory(): ProductFactory
    {
        return ProductFactory::new();
    }

    public function suppliers(): HasManyThrough
    {
        return $this->hasManyThrough(Supplier::class, ProductSupplier::class);
    }

    public function productSuppliers(): HasMany
    {
        return $this->hasMany(ProductSupplier::class, 'product_id', 'id');
    }

    public function subProducts(): HasMany{
        return $this->hasMany(SubProduct::class, 'product_id', 'id');
    }
}

<?php

namespace App\Services\Product\Models;

use App\Services\Product\Database\Factories\ProductFactory;
use App\Services\Vault\Models\Vault;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    public function buyPriceVault(): BelongsTo
    {
        return $this->belongsTo(Vault::class, 'buy_price_vault_id', 'id');
    }

    public function sellPriceVault(): BelongsTo
    {
        return $this->belongsTo(Vault::class, 'sell_price_vault_id', 'id');
    }

    public function productImages(): HasMany{
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }
}

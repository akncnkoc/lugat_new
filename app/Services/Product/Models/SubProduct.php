<?php

namespace App\Services\Product\Models;

use App\Services\Currency\Models\Currency;
use App\Services\Invoice\Traits\TaxType;
use App\Services\Product\Database\Factories\SubProductFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubProduct extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $guarded = [];

    protected $casts = [
        'tax' => TaxType::class
    ];

    protected static function newFactory(): SubProductFactory
    {
        return SubProductFactory::new();
    }

    public function subProductImages(): HasMany
    {
        return $this->hasMany(SubProductImage::class, 'sub_product_id', 'id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function subProductVariants(): HasMany
    {
        return $this->hasMany(SubProductVariant::class, 'sub_product_id', 'id');
    }

    public function buyCurrency(): ?BelongsTo
    {
        return $this->belongsTo(Currency::class, 'buy_currency_id', 'id');
    }
    public function sellCurrency(): ?BelongsTo
    {
        return $this->belongsTo(Currency::class, 'sell_currency_id', 'id');
    }
}

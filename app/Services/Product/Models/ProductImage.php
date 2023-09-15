<?php

namespace App\Services\Product\Models;

use App\Services\Product\Database\Factories\ProductImageFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductImage extends Model
{
    use HasFactory,HasUuids, SoftDeletes;

    protected $guarded = [];

    protected static function newFactory(): ProductImageFactory
    {
        return ProductImageFactory::new();
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}

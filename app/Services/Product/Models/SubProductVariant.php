<?php

namespace App\Services\Product\Models;

use App\Services\Product\Database\Factories\SubProductVariantFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubProductVariant extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $guarded = [];

    public $timestamps = false;

    protected static function newFactory(): SubProductVariantFactory
    {
        return SubProductVariantFactory::new();
    }

    public function subProduct(): BelongsTo
    {
        return $this->belongsTo(SubProduct::class, 'sub_product_id', 'id');
    }

}

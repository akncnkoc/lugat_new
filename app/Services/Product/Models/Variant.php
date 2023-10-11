<?php

namespace App\Services\Product\Models;

use App\Services\Product\Database\Factories\VariantFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Variant extends Model
{
    use HasFactory, HasUuids;

    public $timestamps = false;
    protected $guarded = [];

    protected static function newFactory(): VariantFactory
    {
        return VariantFactory::new();
    }
    public function subVariants(): HasMany
    {
        return $this->hasMany($this, 'parent_id', 'id')->orderBy('name');
    }
}

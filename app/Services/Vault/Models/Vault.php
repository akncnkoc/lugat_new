<?php

namespace App\Services\Vault\Models;

use App\Services\Currency\Models\Currency;
use App\Services\Vault\Database\Factories\VaultFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vault extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function newFactory(): VaultFactory
    {
        return VaultFactory::new();
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id', 'id');
    }
}

<?php

namespace App\Services\Cargo\Models;

use App\Services\Cargo\Database\Factories\CargoFactory;
use App\Services\Cargo\Enums\AmountType;
use App\Services\Cargo\Enums\CargoType;
use App\Services\Currency\Models\Currency;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cargo extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $guarded = [];
    protected $casts = [
        'type' => CargoType::class,
        'amount_type' => AmountType::class,
        'ready_to_ship_date' => 'datetime',
        'shipped_date' => 'datetime',
        'delivered_date' => 'datetime',
        'returned_date' => 'datetime',
    ];


    protected static function newFactory(): CargoFactory
    {
        return CargoFactory::new();
    }

    public function cargoCompany(): BelongsTo
    {
        return $this->belongsTo(CargoCompany::class, 'cargo_company_id', 'id');
    }

    public function priceCurrency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'price_currency_id', 'id');
    }
}


<?php

namespace App\Services\Customer\Models;

use App\Services\Customer\Database\Factories\CustomerShippingAddressFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerShippingAddress extends Model
{
    use HasFactory, HasUuids;

    public function customer(): BelongsTo{
        return $this->belongsTo(Customer::class);
    }
    protected static function newFactory(): CustomerShippingAddressFactory
    {
        return CustomerShippingAddressFactory::new();
    }
}

<?php

namespace App\Services\Customer\Models;

use App\Services\Customer\Database\Factories\CustomerBillingAddressFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerBillingAddress extends Model
{
    use HasFactory, HasUuids;

    protected static function newFactory(): CustomerBillingAddressFactory
    {
        return CustomerBillingAddressFactory::new();
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}

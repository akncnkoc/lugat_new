<?php

namespace App\Services\Customer\Models;

use App\Services\Customer\Database\Factories\CustomerFactory;
use App\Services\Customer\Enums\CustomerType;
use App\Services\Invoice\Models\Invoice;
use App\Services\Invoice\Models\InvoiceProduct;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $guarded = [];

    protected static function newFactory(): CustomerFactory
    {
        return CustomerFactory::new();
    }

    public function scopeBussinessType(Builder $query): Builder
    {
        return $query->where('type', CustomerType::BUSINESS);
    }

    public function scopeIndividualType(Builder $query): Builder
    {
        return $query->where('type', CustomerType::INDIVIDUAL);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class, 'customer_id', 'id');
    }

    public function invoiceProducts(): HasManyThrough
    {
        return $this->hasManyThrough(InvoiceProduct::class, Invoice::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(CustomerContact::class);
    }

    public function customerInfo(): HasOne
    {
        return $this->hasOne(CustomerInfo::class);
    }

    public function billingAddress(): HasOne
    {
        return $this->hasOne(CustomerBillingAddress::class);
    }

    public function shippingAddress(): HasOne
    {
        return $this->hasOne(CustomerShippingAddress::class);
    }

    protected function fullName(): Attribute
    {
        return Attribute::make(get: fn(
            $value,
            $attributes
        ) => $attributes['name'].' '.$attributes['surname']);
    }
}

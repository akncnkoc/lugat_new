<?php

namespace App\Services\Invoice\Models;

use App\Services\Customer\Models\Customer;
use App\Services\Invoice\Database\Factories\InvoiceFactory;
use App\Services\Product\Models\SubProduct;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory, HasUuids, SoftDeletes;


    protected static function newFactory(): InvoiceFactory
    {
        return InvoiceFactory::new();
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function subProducts(): HasManyThrough
    {
        return $this->hasManyThrough(SubProduct::class, InvoiceProduct::class, 'sub_product_id', 'id', 'id', 'sub_product_id');
    }

    public function invoiceProducts(): HasMany
    {
        return $this->hasMany(InvoiceProduct::class, 'invoice_id', 'id');
    }
}

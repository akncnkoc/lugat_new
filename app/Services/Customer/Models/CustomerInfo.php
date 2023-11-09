<?php

namespace App\Services\Customer\Models;

use App\Services\Customer\Database\Factories\CustomerInfoFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerInfo extends Model
{
    use HasFactory, HasUuids;

    public function customer(): BelongsTo{
        return $this->belongsTo(Customer::class);
    }
    protected static function newFactory(): CustomerInfoFactory
    {
        return CustomerInfoFactory::new();
    }
}

<?php

namespace App\Services\Customer\Models;

use App\Services\Customer\Database\Factories\CustomerContactFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerContact extends Model
{
    use HasFactory, HasUuids;

    public function customer(): BelongsTo{
        return $this->belongsTo(Customer::class);
    }
    protected static function newFactory():CustomerContactFactory
    {
        return CustomerContactFactory::new();
    }
}

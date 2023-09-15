<?php

namespace App\Services\Customer\Models;

use App\Services\Customer\Database\Factories\CustomerFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $guarded = [];

    protected static function newFactory(): CustomerFactory
    {
        return CustomerFactory::new();
    }

    public function customerRole(): BelongsTo
    {
        return $this->belongsTo(CustomerRole::class, 'customer_role_id', 'id');
    }

    protected function fullName(): Attribute
    {
        return Attribute::make(get: fn(
            $value,
            $attributes
        ) => $attributes['name'].' '.$attributes['surname']);
    }
}

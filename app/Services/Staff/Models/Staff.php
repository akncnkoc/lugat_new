<?php

namespace App\Services\Staff\Models;

use App\Services\Currency\Models\Currency;
use App\Services\Staff\Database\Factories\StaffFactory;
use App\Services\Staff\Enums\StaffType;
use App\Services\Vault\Models\Vault;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'staffs';

    protected $guarded = [];
    protected $casts = [
        'type' => StaffType::class
    ];

    protected static function newFactory(): StaffFactory
    {
        return StaffFactory::new();
    }

    public function salaryCurrency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'salary_currency_id', 'id');
    }

    protected function fullName(): Attribute
    {
        return Attribute::make(get: fn(
            $value,
            $attributes
        ) => $attributes['name'].' '.$attributes['surname']);
    }
}

<?php

namespace App\Services\Currency\Models;

use App\Services\Currency\Database\Factories\CurrencyFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Currency extends Model
{
    use HasFactory, HasUuids;


    protected $guarded = [];
    protected $casts = [
        'updated_at' => 'datetime'
    ];

    protected static function newFactory(): CurrencyFactory
    {
        return CurrencyFactory::new();
    }

    public function getUpdatedAtColumn(): ?string
    {
        return Carbon::make($this->updated_at)?->format('d.m.Y H:i:s');
    }
}

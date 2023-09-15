<?php

namespace App\Services\Currency\Models;

use App\Services\Currency\Database\Factories\CurrencyFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;


    protected $guarded = [];
    protected static function newFactory(): CurrencyFactory
    {
        return CurrencyFactory::new();
    }

    public function getUpdatedAtColumn(): ?string
    {
        return $this->updated_at->format('d.m.Y H:i:s');
    }
}

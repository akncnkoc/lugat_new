<?php

namespace App\Services\Invoice\Models;

use App\Services\Invoice\Database\Factories\InvoiceProductFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceProduct extends Model
{
    use HasFactory, HasUuids;


    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }
    protected static function newFactory(): InvoiceProductFactory
    {
        return InvoiceProductFactory::new();
    }
}

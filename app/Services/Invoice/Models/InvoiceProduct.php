<?php

namespace App\Services\Invoice\Models;

use App\Services\Invoice\Database\Factories\InvoiceProductFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceProduct extends Model
{
    use HasFactory, HasUuids;

    protected static function newFactory(): InvoiceProductFactory
    {
        return InvoiceProductFactory::new();
    }
}

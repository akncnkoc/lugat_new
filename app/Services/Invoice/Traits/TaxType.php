<?php

namespace App\Services\Invoice\Traits;

enum TaxType: int
{
    case ZERO = 0;
    CASE ONE = 1;
    CASE TEN = 10;
    CASE TWENTY = 20;

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

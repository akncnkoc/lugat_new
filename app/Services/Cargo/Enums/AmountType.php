<?php

namespace App\Services\Cargo\Enums;

enum AmountType: string
{
    case CM = 'cm';
    case MM = 'mm';
    case INCH = 'inch';
    case KM = 'km';
    case M2 = 'm2';
    case M3 = 'm3';
    case G = 'g';
    case KG = 'kg';
    case TON = 'ton';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

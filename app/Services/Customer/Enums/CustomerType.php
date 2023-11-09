<?php

namespace App\Services\Customer\Enums;

enum CustomerType: string
{
    case BUSINESS = 'business';
    case INDIVIDUAL = 'individual';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

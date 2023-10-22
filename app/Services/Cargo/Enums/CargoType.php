<?php

namespace App\Services\Cargo\Enums;

enum CargoType: string
{
    case PREPARING = 'preparing';
    case READY_TO_SHIP = 'ready_to_ship';
    case SHIPPED = 'shipped';
    case DELIVERED = 'delivered';
    case RETURNED = 'returned';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

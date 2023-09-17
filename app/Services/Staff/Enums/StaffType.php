<?php

namespace App\Services\Staff\Enums;

enum StaffType: string
{
    case FULL_TIME = "full_time";
    case PART_TIME = "part_time";
    case TEMPORARY = "temporary";
    case SEASONAl = "seasonal";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
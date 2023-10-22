<?php

namespace App\Services\Expense\Enums;

enum ExpenseStatus: string
{
    case PAIDED = 'paided';
    case SCHEDULED = 'scheduled';
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

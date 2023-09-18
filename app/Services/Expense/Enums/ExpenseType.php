<?php

namespace App\Services\Expense\Enums;

enum ExpenseType: string
{
    case FOOD = 'food';
    case RENT = 'rent';
    case PHONE = 'phone';
    case INTERNET = 'internet';
    case WATER = 'water';
    case HEATING = 'heating';
    case ADVERTISING = 'advertising';
    case PROMOTION = 'promotion';
    case ACCOUNTING = 'accounting';
    case MAINTENANCE_OR_REPAIR = 'maintenance_or_repair';
    case SUPPLIES = 'supplies';
    case LAWYER = 'lawyer';
    case TRANSPORT = 'transport';
    case TRAVEL = 'travel';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

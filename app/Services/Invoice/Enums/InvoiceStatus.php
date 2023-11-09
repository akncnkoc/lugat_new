<?php

namespace App\Services\Invoice\Enums;

enum InvoiceStatus: string
{
    case DRAFT = 'draft';
    case LIVE = 'live';
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

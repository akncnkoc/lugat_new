<?php

namespace App\Services\Customer\Enums;

enum CustomerPaymentTermType: string
{
    case NET15 = 'net15';
    case NET30 = 'net30';
    case NET45 = 'net45';
    case NET60 = 'net60';
    case DUE_END_OF_MONTH = 'due_end_of_month';
    case DUE_END_OF_NEXT_MONTH = 'due_end_of_next_month';
    case DUE_ON_RECEIPT = 'due_on_receipt';


    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

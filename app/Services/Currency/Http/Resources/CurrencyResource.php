<?php

namespace App\Services\Currency\Http\Resources;

use App\Services\Currency\Models\Currency;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Currency
 */
class CurrencyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'forex_buy' => $this->forex_buy,
            'forex_sell' => $this->forex_sell,
            'banknote_buy' => $this->banknote_buy,
            'banknote_sell' => $this->banknote_sell,
            'updated_at' => $this->updated_at
        ];
    }
}

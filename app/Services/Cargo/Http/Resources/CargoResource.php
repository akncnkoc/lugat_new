<?php

namespace App\Services\Cargo\Http\Resources;

use App\Services\Cargo\Models\Cargo;
use App\Services\Currency\Http\Resources\CurrencyResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;


/**
 * @mixin Cargo
 */
class CargoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cargo_company' => CargoCompanyResource::make($this->cargoCompany),
            'type' => $this->type,
            'amount_type' => $this->amount_type,
            'tracking_no' => $this->tracking_no,
            'price' => $this->price,
            'price_currency' => CurrencyResource::make($this->priceCurrency),
            'date_of_paid' => $this->whenNotNull(Carbon::make($this->date_of_paid)?->format('d.m.Y H:i:s'))
        ];
    }
}

<?php

namespace App\Services\Product\Http\Resources;

use App\Services\Product\Models\Product;
use App\Services\Vault\Http\Resources\VaultResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Product
 */
class ProductResource extends JsonResource
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
            'name' => $this->name,
            'model_code' => $this->model_code,
            'buy_price' => $this->buy_price,
            'sell_price' => $this->sell_price,
            'buy_price_vault' => VaultResource::make($this->buyPriceVault),
            'sell_price_vault' => VaultResource::make($this->sellPriceVault),
            'critical_stock_alert' => $this->critical_stock_alert
        ];
    }
}
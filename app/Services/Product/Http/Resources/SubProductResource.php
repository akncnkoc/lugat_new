<?php

namespace App\Services\Product\Http\Resources;

use App\Services\Currency\Http\Resources\CurrencyResource;
use App\Services\Product\Database\Factories\VariantResource;
use App\Services\Product\Models\SubProduct;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin SubProduct
 */
class SubProductResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'sku'           => $this->sku,
            'barcode'       => $this->barcode,
            'buy_price'     => $this->buy_price,
            'sell_price'    => $this->sell_price,
            'buy_currency'  => $this->whenNotNull(CurrencyResource::make($this->buyCurrency)),
            'sell_currency' => CurrencyResource::make($this->sellCurrency),
            'stock'         => $this->stock,
            'tax'           => $this->tax,
            'images'        => $this->subProductImages,
            'variants'      => $this->whenNotNull(VariantResource::collection($this->variants))
        ];
    }
}

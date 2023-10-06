<?php

namespace App\Services\Product\Http\Resources;

use App\Services\Product\Models\Product;
use App\Services\Supplier\Http\Resources\SupplierResource;
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
            'suppliers' => SupplierResource::collection($this->suppliers),
            'sub_products' => SubProductResource::collection($this->subProducts),
        ];
    }
}

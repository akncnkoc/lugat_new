<?php

namespace App\Services\Product\Database\Factories;

use App\Services\Product\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Variant
 */
class VariantResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'   => $this->id,
            'name' => $this->name
        ];
    }
}

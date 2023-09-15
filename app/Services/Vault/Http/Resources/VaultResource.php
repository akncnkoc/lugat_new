<?php

namespace App\Services\Vault\Http\Resources;

use App\Services\Currency\Http\Resources\CurrencyResource;
use App\Services\Vault\Models\Vault;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Vault
 */
class VaultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'       => $this->id,
            'name'     => $this->name,
            'currency' => CurrencyResource::make($this->currency)
        ];
    }
}

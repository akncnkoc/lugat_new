<?php

namespace App\Services\Staff\Http\Resources;

use App\Services\Currency\Http\Resources\CurrencyResource;
use App\Services\Staff\Models\Staff;
use App\Services\Vault\Http\Resources\VaultResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Staff
 */
class StaffResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'name'         => $this->name,
            'surname'      => $this->surname,
            'full_name'    => $this->full_name,
            'email'        => $this->email,
            'phone'        => $this->phone,
            'type'         => $this->type,
            'salary'       => $this->salary,
            'salary_currency' => CurrencyResource::make($this->salaryCurrency),
        ];
    }
}

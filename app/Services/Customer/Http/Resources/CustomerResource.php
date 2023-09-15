<?php

namespace App\Services\Customer\Http\Resources;

use App\Services\Customer\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Customer
 */
class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'surname'       => $this->surname,
            'phone'         => $this->phone,
            'email'         => $this->email,
            'gender'        => $this->gender,
            'customer_role' => $this->whenNotNull($this->customerRole()),
            'city'          => $this->city,
            'district'      => $this->district,
            'neighborhood'  => $this->neighborhood,
            'address'       => $this->address,
            'comment'       => $this->comment
        ];
    }
}

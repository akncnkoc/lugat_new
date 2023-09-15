<?php

namespace App\Services\User\Http\Resources;

use App\Services\User\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin User
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id'       => $this->id,
            'name'     => $this->name,
            'surname'  => $this->surname,
            'email'    => $this->email,
            'phone'    => $this->phone,
            'username' => $this->username
        ];
    }
}

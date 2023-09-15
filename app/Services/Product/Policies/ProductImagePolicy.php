<?php

namespace App\Services\Product\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductImagePolicy
{
    use HandlesAuthorization;


    public function productImageStore(User $user): bool
    {
        return $user->can('store product image');
    }

    public function productImageView(User $user): bool
    {
        return $user->can('view product image');
    }

    public function productImageDelete(User $user): bool
    {
        return $user->can('delete product image');
    }

}

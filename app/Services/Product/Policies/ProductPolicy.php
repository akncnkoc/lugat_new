<?php

namespace App\Services\Product\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductPolicy
{
    use HandlesAuthorization;


    public function productStore(User $user): bool
    {
        return $user->can('store product');
    }

    public function productView(User $user): bool
    {
        return $user->can('view product');
    }

    public function productUpdate(User $user): bool
    {
        return $user->can('update product');
    }

    public function productDelete(User $user): bool
    {
        return $user->can('delete product');
    }

}

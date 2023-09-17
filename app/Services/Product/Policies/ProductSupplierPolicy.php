<?php

namespace App\Services\Product\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductSupplierPolicy
{
    use HandlesAuthorization;


    public function productSupplierStore(User $user): bool
    {
        return $user->can('store product supplier');
    }

    public function productSupplierDelete(User $user): bool
    {
        return $user->can('delete product supplier');
    }

}

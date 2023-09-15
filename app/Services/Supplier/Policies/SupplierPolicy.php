<?php

namespace App\Services\Supplier\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SupplierPolicy
{
    use HandlesAuthorization;


    public function supplierStore(User $user): bool
    {
        return $user->can('store supplier');
    }

    public function supplierView(User $user): bool
    {
        return $user->can('view supplier');
    }

    public function supplierUpdate(User $user): bool
    {
        return $user->can('update supplier');
    }

    public function supplierDelete(User $user): bool
    {
        return $user->can('delete supplier');
    }

}

<?php

namespace App\Services\Customer\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CustomerRolePolicy
{
    use HandlesAuthorization;


    public function customerRoleStore(User $user): bool
    {
        return $user->can('store customer role');
    }

    public function customerRoleView(User $user): bool
    {
        return $user->can('view customer role');
    }

    public function customerRoleUpdate(User $user): bool
    {
        return $user->can('update customer role');
    }

    public function customerRoleDelete(User $user): bool
    {
        return $user->can('delete customer role');
    }

}

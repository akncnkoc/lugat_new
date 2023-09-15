<?php

namespace App\Services\Customer\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CustomerTypePolicy
{
    use HandlesAuthorization;


    public function customerTypeStore(User $user): bool
    {
        return $user->can('store customer type');
    }

    public function customerTypeView(User $user): bool
    {
        return $user->can('view customer type');
    }

    public function customerTypeUpdate(User $user): bool
    {
        return $user->can('update customer type');
    }

    public function customerTypeDelete(User $user): bool
    {
        return $user->can('delete customer type');
    }

}

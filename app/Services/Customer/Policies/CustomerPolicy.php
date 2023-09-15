<?php

namespace App\Services\Customer\Policies;

use App\Services\Customer\Models\Customer;
use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CustomerPolicy
{
    use HandlesAuthorization;


    public function customerStore(User $user): bool
    {
        return $user->can('store customer');
    }

    public function customerView(User $user): bool
    {
        return $user->can('view customer');
    }

    public function customerUpdate(User $user): bool
    {
        return $user->can('update customer');
    }


    public function customerDelete(User $user): bool
    {
        return $user->can('delete customer');
    }

}

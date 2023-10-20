<?php

namespace App\Services\Cargo\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CargoCompanyPolicy
{
    use HandlesAuthorization;


    public function cargoCompanyStore(User $user): bool
    {
        return $user->can('store cargo company');
    }

    public function cargoCompanyView(User $user): bool
    {
        return $user->can('view cargo company');
    }

    public function cargoCompanyUpdate(User $user): bool
    {
        return $user->can('update cargo company');
    }

    public function cargoCompanyDelete(User $user): bool
    {
        return $user->can('delete cargo company');
    }

}

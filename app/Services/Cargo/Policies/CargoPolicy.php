<?php

namespace App\Services\Cargo\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CargoPolicy
{
    use HandlesAuthorization;

    public function cargoView(User $user): bool
    {
        return $user->can('view cargo');
    }
    public function cargoStore(User $user): bool
    {
        return $user->can('store cargo');
    }

    public function cargoUpdate(User $user): bool
    {
        return $user->can('update cargo');
    }

    public function cargoDelete(User $user): bool
    {
        return $user->can('delete cargo');
    }

}

<?php

namespace App\Services\Vault\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class VaultPolicy
{
    use HandlesAuthorization;


    public function vaultStore(User $user): bool
    {
        return $user->can('store vault');
    }

    public function vaultView(User $user): bool
    {
        return $user->can('view vault');
    }

    public function vaultUpdate(User $user): bool
    {
        return $user->can('update vault');
    }

    public function vaultDelete(User $user): bool
    {
        return $user->can('delete vault');
    }

}

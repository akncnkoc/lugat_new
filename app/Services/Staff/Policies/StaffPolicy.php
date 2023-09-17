<?php

namespace App\Services\Staff\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class StaffPolicy
{
    use HandlesAuthorization;


    public function staffStore(User $user): bool
    {
        return $user->can('store staff');
    }

    public function staffView(User $user): bool
    {
        return $user->can('view staff');
    }

    public function staffUpdate(User $user): bool
    {
        return $user->can('update staff');
    }


    public function staffDelete(User $user): bool
    {
        return $user->can('delete staff');
    }

}

<?php

namespace App\Services\Expense\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ExpensePolicy
{
    use HandlesAuthorization;


    public function expenseStore(User $user): bool
    {
        return $user->can('store expense');
    }

    public function expenseView(User $user): bool
    {
        return $user->can('view expense');
    }

    public function expenseUpdate(User $user): bool
    {
        return $user->can('update expense');
    }


    public function expenseDelete(User $user): bool
    {
        return $user->can('delete expense');
    }

}

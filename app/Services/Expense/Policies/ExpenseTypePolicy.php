<?php

namespace App\Services\Expense\Policies;

use App\Services\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ExpenseTypePolicy
{
    use HandlesAuthorization;


    public function expenseTypeStore(User $user): bool
    {
        return $user->can('store expense type');
    }

    public function expenseTypeView(User $user): bool
    {
        return $user->can('view expense type');
    }

    public function expenseTypeUpdate(User $user): bool
    {
        return $user->can('update expense type');
    }


    public function expenseTypeDelete(User $user): bool
    {
        return $user->can('delete expense type');
    }

}

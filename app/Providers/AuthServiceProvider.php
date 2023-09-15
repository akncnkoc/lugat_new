<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Services\Customer\Models\Customer;
use App\Services\Customer\Models\CustomerRole;
use App\Services\Customer\Policies\CustomerPolicy;
use App\Services\Customer\Policies\CustomerRolePolicy;
use App\Services\Expense\Models\Expense;
use App\Services\Expense\Policies\ExpensePolicy;
use App\Services\Vault\Models\Vault;
use App\Services\Vault\Policies\VaultPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Customer::class     => CustomerPolicy::class,
        CustomerRole::class => CustomerRolePolicy::class,
        Expense::class      => ExpensePolicy::class,
        Vault::class        => VaultPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}

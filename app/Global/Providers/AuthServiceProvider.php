<?php

namespace App\Global\Providers;

use App\Services\Customer\Models\Customer;
use App\Services\Customer\Models\CustomerType;
use App\Services\Customer\Policies\CustomerPolicy;
use App\Services\Customer\Policies\CustomerTypePolicy;
use App\Services\Expense\Models\Expense;
use App\Services\Expense\Policies\ExpensePolicy;
use App\Services\Product\Models\Product;
use App\Services\Product\Models\ProductImage;
use App\Services\Product\Models\ProductSupplier;
use App\Services\Product\Policies\ProductImagePolicy;
use App\Services\Product\Policies\ProductPolicy;
use App\Services\Product\Policies\ProductSupplierPolicy;
use App\Services\Staff\Models\Staff;
use App\Services\Staff\Policies\StaffPolicy;
use App\Services\Supplier\Models\Supplier;
use App\Services\Supplier\Policies\SupplierPolicy;
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
        Customer::class        => CustomerPolicy::class,
        CustomerType::class    => CustomerTypePolicy::class,
        Expense::class         => ExpensePolicy::class,
        Vault::class           => VaultPolicy::class,
        Supplier::class        => SupplierPolicy::class,
        Product::class         => ProductPolicy::class,
        ProductImage::class    => ProductImagePolicy::class,
        ProductSupplier::class => ProductSupplierPolicy::class,
        Staff::class           => StaffPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
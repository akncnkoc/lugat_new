<?php

use Illuminate\Support\ServiceProvider;

return [
    'name' => env('APP_NAME', 'Lügat'),
    'env' => env('APP_ENV', 'production'),
    'debug' => (bool) env('APP_DEBUG', false),
    'url' => env('APP_URL', 'http://localhost'),
    'asset_url' => env('ASSET_URL'),
    'timezone' => 'Europe/Istanbul',
    'locale' => 'en',
    'fallback_locale' => 'en',
    'faker_locale' => 'en_US',
    'key' => env('APP_KEY'),
    'cipher' => 'AES-256-CBC',
    'maintenance' => [
        'driver' => 'file',
        // 'store'  => 'redis',
    ],
    'providers' => ServiceProvider::defaultProviders()->merge([
        \App\Global\Providers\AppServiceProvider::class,
        \App\Global\Providers\AuthServiceProvider::class,
            // App\Providers\BroadcastServiceProvider::class,
        \App\Global\Providers\EventServiceProvider::class,
        \App\Global\Providers\RouteServiceProvider::class,
        Spatie\Permission\PermissionServiceProvider::class,
        App\Services\Auth\Providers\AuthServiceProvider::class,
        Intervention\Image\ImageServiceProvider::class,
        App\Services\Currency\Providers\CurrencyServiceProvider::class,
        App\Services\Vault\Providers\VaultServiceProvider::class,
        App\Services\User\Providers\UserServiceProvider::class,
        App\Services\Customer\Providers\CustomerServiceProvider::class,
        App\Services\Expense\Providers\ExpenseServiceProvider::class,
        App\Services\Supplier\Providers\SupplierServiceProvider::class,
        App\Services\Product\Providers\ProductServiceProvider::class,
        App\Services\Staff\Providers\StaffServiceProvider::class,
        App\Services\Invoice\Providers\InvoiceServiceProvider::class,
        App\Services\Dashboard\Providers\DashboardServiceProvider::class,
        App\Services\Cargo\Providers\CargoServiceProvider::class,
        App\Services\Setting\Providers\SettingServiceProvider::class,
    ])->toArray(),

    'aliases' => [
        'Image' => Intervention\Image\Facades\Image::class
    ]
];

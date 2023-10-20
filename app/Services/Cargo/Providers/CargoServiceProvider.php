<?php

namespace App\Services\Cargo\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class CargoServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../Database/Migrations');
        $this->registerRoutes();
    }

    protected function registerRoutes(): void
    {
        Route::group($this->routeConfiguration(), function () {
            $this->loadRoutesFrom(__DIR__ . '/../Routes/api.php');
        });
    }

    protected function routeConfiguration(): array
    {
        return [
            'middleware' => ['api'],
        ];
    }
}

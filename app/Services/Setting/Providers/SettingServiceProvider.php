<?php

namespace App\Services\Setting\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class SettingServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->registerRoutes();
    }

    protected function registerRoutes(): void
    {
        Route::group($this->routeConfiguration(), function () {
            $this->loadRoutesFrom(__DIR__.'/../Routes/api.php');
        });
    }

    protected function routeConfiguration(): array
    {
        return [
            'middleware' => ['api'],
        ];
    }
}

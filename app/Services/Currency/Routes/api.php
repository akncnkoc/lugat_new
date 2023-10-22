<?php


use App\Services\Currency\Http\Controllers\CurrencyController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])
    ->prefix('/api/v1/currency')
    ->name('currency.')
    ->controller(CurrencyController::class)
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/search', 'search')->name('index');
        Route::put('/update-primary-currency/{currency}', 'updatePrimaryCurrency')->name('update-primary-currency');
        Route::put('/reload', 'loadCurrenciesFromTCMB')->name('reload');
    });

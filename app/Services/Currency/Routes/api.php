<?php


use App\Services\Currency\Http\Controllers\CurrencyController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('/v1/currency')->name('currency.')->group(function () {
    Route::get('/', [CurrencyController::class, 'index'])->name('index');
    Route::post('/{currency}', [CurrencyController::class, 'updatePrimaryCurrency'])->name('update-primary-currency');
    Route::put('/reload', [CurrencyController::class, 'loadCurrenciesFromTCMB'])->name('reload');
});

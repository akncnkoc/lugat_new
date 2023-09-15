<?php


use App\Services\Vault\Http\Controllers\VaultController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('/v1/vault')->name('vault.')->group(function () {
    Route::get('/', [VaultController::class, 'index'])->name('index');
    Route::get('/{vault}', [VaultController::class, 'show'])->name('show');
    Route::post('/search', [VaultController::class, 'search'])->name('search');
    Route::post('/', [VaultController::class, 'store'])->name('store');
    Route::put('/{vault}', [VaultController::class, 'update'])->name('update');
    Route::delete('/{vault}', [VaultController::class, 'destroy'])->name('destroy');
});

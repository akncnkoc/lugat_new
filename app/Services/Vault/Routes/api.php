<?php


use App\Services\Vault\Http\Controllers\VaultController;
use Illuminate\Support\Facades\Route;


Route::prefix('/api/v1/')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::apiResource('vault', VaultController::class);
     });
Route::prefix('/api/v1/vault')
     ->controller(VaultController::class)
     ->name('vault.')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::post('search', 'search')->name('search');
     });

<?php

use App\Services\Cargo\Http\Controllers\CargoCompanyController;
use App\Services\Cargo\Http\Controllers\CargoController;
use Illuminate\Support\Facades\Route;

Route::prefix('/api/v1/')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::apiResource('cargo', CargoController::class);
    });


Route::prefix('/api/v1/')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::apiResource('cargo-company', CargoCompanyController::class);
    });

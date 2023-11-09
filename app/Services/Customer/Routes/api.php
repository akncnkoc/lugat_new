<?php


use App\Services\Customer\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

Route::prefix('/api/v1/')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::apiResource('customer', CustomerController::class);
     });

Route::prefix('/api/v1/customer')
     ->controller(CustomerController::class)
     ->name('customer.')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::post('search', 'search')->name('search');
     });

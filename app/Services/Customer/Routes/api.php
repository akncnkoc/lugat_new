<?php


use App\Services\Customer\Http\Controllers\CustomerController;
use App\Services\Customer\Http\Controllers\CustomerTypeController;
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


Route::prefix('/api/v1/')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::apiResource('customer-type', CustomerTypeController::class);
     });

Route::prefix('/api/v1/customer-type')
     ->controller(CustomerTypeController::class)
     ->name('customer-type.')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::post('search', 'search')->name('search');
     });

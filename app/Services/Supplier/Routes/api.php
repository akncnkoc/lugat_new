<?php


use App\Services\Supplier\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;


Route::prefix('/api/v1/')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::apiResource('supplier', SupplierController::class);
     });
Route::prefix('/api/v1/supplier')
     ->controller(SupplierController::class)
     ->name('supplier.')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::post('search', 'search')->name('search');
     });

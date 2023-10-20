<?php


use App\Services\Product\Http\Controllers\ProductController;
use App\Services\Product\Http\Controllers\ProductImageController;
use App\Services\Product\Http\Controllers\ProductSupplierController;
use App\Services\Product\Http\Controllers\SubProductController;
use App\Services\Product\Http\Controllers\VariantController;
use Illuminate\Support\Facades\Route;


Route::prefix('/api/v1/')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::apiResource('product', ProductController::class);
    });

Route::prefix('/api/v1/product')
    ->controller(ProductController::class)
    ->name('product.')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::post('search', 'search')->name('search');
    });


Route::prefix('/api/v1')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::apiResource('variant', VariantController::class);
    });

Route::prefix('/api/v1/sub-product')
    ->controller(SubProductController::class)
    ->name('sub-product.')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::post('/', 'updateSubProducts')->name('update-sub-products');
        Route::put('/{product}', 'storeSubProducts')->name('store-sub-products');
        Route::delete('/{subProduct}', 'destroy')->name('destroy');
    });


Route::prefix('/api/v1/product-image')
    ->controller(ProductImageController::class)
    ->name('product-image.')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/{product}', 'index')->name('index');
        Route::get('/product/{productImage}', 'show')->name('show');
        Route::post('/{product}', 'store')->name('store');
        Route::delete('/{product}/{productImage}', 'destroy')->name('destroy');
    });


Route::prefix('/api/v1/product-supplier')
    ->controller(ProductSupplierController::class)
    ->name('product-supplier.')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::post('/{product}', 'store')->name('store');
        Route::delete('/{productSupplier}/{product}', 'destroy')->name('destroy');
    });

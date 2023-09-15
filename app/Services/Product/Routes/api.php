<?php


use App\Services\Product\Http\Controllers\ProductController;
use App\Services\Product\Http\Controllers\ProductImageController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('/v1/product')->name('product.')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::get('/{product}', [ProductController::class, 'show'])->name('show');
    Route::post('/search', [ProductController::class, 'search'])->name('search');
    Route::post('/', [ProductController::class, 'store'])->name('store');
    Route::put('/{product}', [ProductController::class, 'update'])->name('update');
    Route::delete('/{product}', [ProductController::class, 'destroy'])->name('destroy');
});


Route::middleware(['auth:sanctum'])->prefix('/v1/product-image')->name('product-image.')->group(function () {
    Route::post('/{product}', [ProductImageController::class, 'storeImage'])->name('store-image');
    Route::delete('/{product}/{productImage}', [ProductImageController::class, 'deleteImage'])->name('delete-image');
});

<?php


use App\Services\Customer\Http\Controllers\CustomerController;
use App\Services\Customer\Http\Controllers\CustomerTypeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('/v1/customer')->name('customer.')->group(function () {
    Route::get('/', [CustomerController::class, 'index'])->name('index');
    Route::get('/{customer}', [CustomerController::class, 'show'])->name('show');
    Route::post('/search', [CustomerController::class, 'search'])->name('search');
    Route::post('/', [CustomerController::class, 'store'])->name('store');
    Route::put('/{customer}', [CustomerController::class, 'update'])->name('update');
    Route::delete('/{customer}', [CustomerController::class, 'destroy'])->name('destroy');
});
Route::middleware(['auth:sanctum'])->prefix('/v1/customer-type')->name('customer-type.')->group(function () {
    Route::get('/', [CustomerTypeController::class, 'index'])->name('index');
    Route::get('/{customerType}', [CustomerTypeController::class, 'show'])->name('show');
    Route::post('/search', [CustomerTypeController::class, 'search'])->name('search');
    Route::post('/', [CustomerTypeController::class, 'store'])->name('store');
    Route::put('/{customerType}', [CustomerTypeController::class, 'update'])->name('update');
    Route::delete('/{customerType}', [CustomerTypeController::class, 'destroy'])->name('destroy');
});


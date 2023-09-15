<?php


use App\Services\Customer\Http\Controllers\CustomerController;
use App\Services\Customer\Http\Controllers\CustomerRoleController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('/v1/customer')->name('customer.')->group(function () {
    Route::get('/', [CustomerController::class, 'index'])->name('index');
    Route::get('/{customer}', [CustomerController::class, 'show'])->name('show');
    Route::post('/search', [CustomerController::class, 'search'])->name('search');
    Route::post('/', [CustomerController::class, 'store'])->name('store');
    Route::put('/{customer}', [CustomerController::class, 'update'])->name('update');
    Route::delete('/{customer}', [CustomerController::class, 'destroy'])->name('destroy');
});
Route::middleware(['auth:sanctum'])->prefix('/v1/customerRole')->name('customerRole.')->group(function () {
    Route::get('/', [CustomerRoleController::class, 'index'])->name('index');
    Route::get('/{customerRole}', [CustomerRoleController::class, 'show'])->name('show');
    Route::post('/search', [CustomerRoleController::class, 'search'])->name('search');
    Route::post('/', [CustomerRoleController::class, 'store'])->name('store');
    Route::put('/{customerRole}', [CustomerRoleController::class, 'update'])->name('update');
    Route::delete('/{customerRole}', [CustomerRoleController::class, 'destroy'])->name('destroy');
});


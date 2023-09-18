<?php


use App\Services\Expense\Http\Controllers\ExpenseController;
use Illuminate\Support\Facades\Route;

Route::prefix('/api/v1/')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::apiResource('expense', ExpenseController::class);
     });
Route::prefix('/api/v1/expense')
     ->controller(ExpenseController::class)
     ->name('expense.')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::post('search', 'search')->name('search');
     });

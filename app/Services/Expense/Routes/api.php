<?php


use App\Services\Expense\Http\Controllers\ExpenseController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('/v1/expense')->name('expense.')->group(function () {
    Route::get('/', [ExpenseController::class, 'index'])->name('index');
    Route::get('/{customer}', [ExpenseController::class, 'show'])->name('show');
    Route::post('/search', [ExpenseController::class, 'search'])->name('search');
    Route::post('/', [ExpenseController::class, 'store'])->name('store');
    Route::put('/{customer}', [ExpenseController::class, 'update'])->name('update');
    Route::delete('/{customer}', [ExpenseController::class, 'destroy'])->name('destroy');
});

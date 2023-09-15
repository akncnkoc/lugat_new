<?php


use App\Services\Expense\Http\Controllers\ExpenseController;
use App\Services\Expense\Http\Controllers\ExpenseTypeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('/v1/expense')->name('expense.')->group(function () {
    Route::get('/', [ExpenseController::class, 'index'])->name('index');
    Route::get('/{expense}', [ExpenseController::class, 'show'])->name('show');
    Route::post('/search', [ExpenseController::class, 'search'])->name('search');
    Route::post('/', [ExpenseController::class, 'store'])->name('store');
    Route::put('/{expense}', [ExpenseController::class, 'update'])->name('update');
    Route::delete('/{expense}', [ExpenseController::class, 'destroy'])->name('destroy');
});


Route::middleware(['auth:sanctum'])->prefix('/v1/expense-type')->name('expense-type.')->group(function () {
    Route::get('/', [ExpenseTypeController::class, 'index'])->name('index');
    Route::get('/{expenseType}', [ExpenseTypeController::class, 'show'])->name('show');
    Route::post('/search', [ExpenseTypeController::class, 'search'])->name('search');
    Route::post('/', [ExpenseTypeController::class, 'store'])->name('store');
    Route::put('/{expenseType}', [ExpenseTypeController::class, 'update'])->name('update');
    Route::delete('/{expenseType}', [ExpenseTypeController::class, 'destroy'])->name('destroy');
});

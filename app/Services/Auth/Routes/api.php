<?php


use App\Services\Auth\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('/v1/auth')->name('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

Route::prefix('/v1/auth')->name('auth')->group(function () {
    Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('auth.authenticate');
    Route::post('/forgotPassword', [AuthController::class, 'forgotPassword'])->name('auth.forgot-password');
    Route::post('/resetPassword', [AuthController::class, 'resetPassword'])->name('auth.reset-password');
});

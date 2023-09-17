<?php


use App\Services\Auth\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('/api/v1/auth')->name('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

Route::prefix('/api/v1/auth')->name('auth')->controller(AuthController::class)->group(function () {
    Route::post('/authenticate', 'authenticate')->name('auth.authenticate');
    Route::post('/forgotPassword', 'forgotPassword')->name('auth.forgot-password');
    Route::post('/resetPassword', 'resetPassword')->name('auth.reset-password');
});

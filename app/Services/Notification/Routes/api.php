<?php


use App\Services\Notification\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('/api/v1/notification')->name('notification.')->group(function () {
    Route::get('/', [NotificationController::class, 'index'])->name('index');
});

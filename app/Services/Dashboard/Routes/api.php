<?php


use App\Services\Dashboard\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;


Route::prefix('/api/v1/dashboard')
     ->controller(DashboardController::class)
     ->name('dashboard.')
//     ->middleware('auth:sanctum')
     ->group(function () {
         Route::get('/', 'index')->name('index');
     });


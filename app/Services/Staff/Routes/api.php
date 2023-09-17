<?php


use App\Services\Staff\Http\Controllers\StaffController;
use Illuminate\Support\Facades\Route;


Route::prefix('/api/v1/')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::apiResource('staff', StaffController::class);
     });

Route::prefix('/api/v1/staff')
     ->controller(StaffController::class)
     ->name('staff.')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::post('search', 'search')->name('search');
     });

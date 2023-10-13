<?php


use App\Services\Setting\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('/api/v1/setting')
     ->controller(SettingController::class)
     ->name('setting.')
     ->middleware('auth:sanctum')
     ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
    });

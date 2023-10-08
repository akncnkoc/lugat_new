<?php


use App\Services\Invoice\Http\Controllers\InvoiceController;
use Illuminate\Support\Facades\Route;

Route::prefix('/api/v1/')
     ->middleware('auth:sanctum')
     ->group(function () {
         Route::apiResource('invoice', InvoiceController::class);
     });

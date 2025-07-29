<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\TransactionController;
use App\Http\Controllers\Api\V1\BudgetController;
use App\Http\Controllers\Api\V1\DashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // Auth Routes
    Route::post('login', [AuthController::class, 'login']);

    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        // Auth
        Route::post('logout', [AuthController::class, 'logout']);

        // Categories
        Route::apiResource('categories', CategoryController::class)->only(['index', 'store', 'update', 'destroy']);

        // Transactions
        Route::apiResource('transactions', TransactionController::class)->only(['index', 'store', 'update', 'destroy']);

        // Budgets
        Route::apiResource('budgets', BudgetController::class)->only(['index', 'store', 'update', 'destroy']);

        // Dashboard
        Route::get('dashboard/summary', [DashboardController::class, 'summary']);
        Route::get('dashboard/chart', [DashboardController::class, 'chart']);
    });
});

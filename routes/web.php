<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Dashboard route
Route::get('/dashboard', function () {
    return view('welcome');
})->middleware('auth');

// Transactions routes
Route::get('/transactions', function () {
    return view('welcome');
})->middleware('auth');

Route::get('/transactions/create', function () {
    return view('welcome');
})->middleware('auth');

Route::get('/transactions/{id}/edit', function () {
    return view('welcome');
})->middleware('auth');

// Budgets routes
Route::get('/budgets', function () {
    return view('welcome');
})->middleware('auth');

// Categories routes
Route::get('/categories', function () {
    return view('welcome');
})->middleware('auth');

Route::get('/categories/create', function () {
    return view('welcome');
})->middleware('auth');

Route::get('/categories/{id}/edit', function () {
    return view('welcome');
})->middleware('auth');

// Authentication routes
Route::get('/login', function () {
    return view('welcome');
})->name('login');

Route::get('/register', function () {
    return view('welcome');
});

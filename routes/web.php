<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/overview/{currency}', [\App\Http\Controllers\HomeController::class, 'dashboard'])->name('dashboard');
    Route::get('/transaction/create', [\App\Http\Controllers\TransactionController::class, 'create'])->name('add transaction');
    Route::post('/transaction/store', [\App\Http\Controllers\TransactionController::class, 'store'])->name('transaction.store');
    Route::get('/transaction/summary/{currency}', [\App\Http\Controllers\TransactionController::class, 'index'])->name('summary');
    Route::patch('settings/{user}', [\App\Http\Controllers\SettingController::class, 'update'])->name('settings.update');
});

require __DIR__ . '/auth.php';

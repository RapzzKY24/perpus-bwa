<?php

use App\Http\Controllers\admin\BookFrontController;
use App\Http\Controllers\admin\CategoryFrontController;
use App\Http\Controllers\admin\FineFrontController;
use App\Http\Controllers\admin\loanFrontController;
use App\Http\Controllers\admin\ReturnBookFrontController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\paymentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::redirect('/','login');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::controller(DashboardController::class)->middleware(['auth','verified'])->group(function(){
    Route::get('dashboard','index')->name('dashboard');
});

Route::controller(BookFrontController::class)->middleware(['auth','verified','dynamic.role_permission'])->group(function(){
    Route::get('books','index')->name('front.books.index');
    Route::get('books/{book:slug}','show')->name('front.books.show');
});

Route::controller(CategoryFrontController::class)->middleware(['auth','verified','dynamic.role_permission'])->group(function(){
    Route::get('categories','index')->name('front.categories.index');
    Route::get('categories/{category:slug}','show')->name('front.categories.show');
});

Route::controller(loanFrontController::class)->middleware(['auth','verified','dynamic.role_permission'])->group(function(){
    Route::get('loans','index')->name('front.loans.index');
    Route::get('loans/{loan:loan_code}/detail','show')->name('front.loans.show');
    Route::post('loans/{book:slug}/create','store')->name('front.loans.store');
});

Route::controller(ReturnBookFrontController::class)->middleware(['auth','verified','dynamic.role_permission'])->group(function(){
    Route::get('return-books','index')->name('front.return-books.index');
    Route::get('return-books/{returnBook:return_book_code}/detail','show')->name('front.return-books.show');
    Route::post('return-books/{book:slug}/create/{loan:loan_code}','store')->name('front.return-books.store');
});

Route::controller(paymentController::class)->group(function(){
    Route::post('payments','create')->name('payments.create');
    Route::post('payments/callback','callback')->name('payments.callback');
    Route::get('payments/success','success')->name('payments.success');
});

Route::get('fines',FineFrontController::class)
->middleware(['auth','verified','dynamic.role_permission'])
->name('front.fines.index');

require __DIR__.'/auth.php';

require __DIR__ .'/admin.php';

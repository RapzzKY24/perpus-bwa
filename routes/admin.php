<?php

use App\Http\Controllers\admin\AnnouncementController;
use App\Http\Controllers\admin\AssignementPermissionController;
use App\Http\Controllers\admin\AssignmentPermissionController;
use App\Http\Controllers\admin\AssignUserController;
use App\Http\Controllers\admin\BookController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\FineController;
use App\Http\Controllers\admin\FineReportController;
use App\Http\Controllers\admin\FineSettingController;
use App\Http\Controllers\admin\LoanController;
use App\Http\Controllers\admin\loanStatisticsController;
use App\Http\Controllers\admin\PermissionController;
use App\Http\Controllers\admin\PublisherController;
use App\Http\Controllers\admin\ReturnBookController;
use App\Http\Controllers\admin\RoleController;
use App\Http\Controllers\admin\routeAccessController;
use App\Http\Controllers\admin\stockBookController;
use App\Http\Controllers\admin\UserController;
use App\Models\Announcment;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth','dynamic.role_permission'])->prefix('admin')->group(function () {

    Route::controller(loanStatisticsController::class)->group(function(){
        Route::get('loan-statistics','index')->name('admin.loan-statistics.index');
    });

    Route::controller(FineReportController::class)->group(function(){
        Route::get('fine-reports','index')->name('admin.fine-reports.index');
    });

    Route::controller(stockBookController::class)->group(function(){
        Route::get('stock-book-reports','index')->name('admin.stock-book-reports.index');
        Route::get('stock-book-reports/edit/{stock}','edit')->name('admin.stock-book-reports.edit');
        Route::put('stock-book-reports/edit/{stock}','update')->name('admin.stock-book-reports.update');
    });

    Route::controller(CategoryController::class)->group(function(){
        Route::get('categories','index')->name('admin.categories.index');
        Route::get('categories/create','create')->name('admin.categories.create');
        Route::post('categories/create','store')->name('admin.categories.store');
        Route::get('categories/edit/{category}','edit')->name('admin.categories.edit');
        Route::put('categories/edit/{category}','update')->name('admin.categories.update');
        Route::delete('categories/destroy/{category}','destroy')->name('admin.categories.destroy');
    });

    Route::controller(PublisherController::class)->group(function(){
        Route::get('publishers','index')->name('admin.publishers.index');
        Route::get('publishers/create','create')->name('admin.publishers.create');
        Route::post('publishers/create','store')->name('admin.publishers.store');
        Route::get('publishers/edit/{publisher}','edit')->name('admin.publishers.edit');
        Route::put('publishers/edit/{publisher}','update')->name('admin.publishers.update');
        Route::delete('publishers/destroy/{publisher}','destroy')->name('admin.publishers.destroy');
    });

    Route::controller(BookController::class)->group(function(){
        Route::get('books','index')->name('admin.books.index');
        Route::get('books/create','create')->name('admin.books.create');
        Route::post('books/create','store')->name('admin.books.store');
        Route::get('books/edit/{book}','edit')->name('admin.books.edit');
        Route::put('books/edit/{book}','update')->name('admin.books.update');
        Route::delete('books/destroy/{book}','destroy')->name('admin.books.destroy');
    });


    Route::controller(UserController::class)->group(function(){
        Route::get('users','index')->name('admin.users.index');
        Route::get('users/create','create')->name('admin.users.create');
        Route::post('users/create','store')->name('admin.users.store');
        Route::get('users/edit/{user}','edit')->name('admin.users.edit');
        Route::put('users/edit/{user}','update')->name('admin.users.update');
        Route::delete('users/destroy/{user}','destroy')->name('admin.users.destroy');
    });

    Route::controller(FineSettingController::class)->group(function(){
        Route::get('fine-settings/create','create')->name('admin.fine-settings.create');
        Route::put('fine-settings/create','store')->name('admin.fine-settings.store');

    });

    Route::controller(LoanController::class)->group(function(){
        Route::get('loans','index')->name('admin.loans.index');
        Route::get('loans/create','create')->name('admin.loans.create');
        Route::post('loans/create','store')->name('admin.loans.store');
        Route::get('loans/edit/{loan}','edit')->name('admin.loans.edit');
        Route::put('loans/edit/{loan}','update')->name('admin.loans.update');
        Route::delete('loans/destroy/{loan}','destroy')->name('admin.loans.destroy');
    });

    Route::controller(ReturnBookController::class)->group(function(){
        Route::get('return-books','index')->name('admin.return-books.index');
        Route::get('return-books/{loan:loan_code}/create','create')->name('admin.return-books.create');
        Route::put('return-books/{loan:loan_code}/create','store')->name('admin.return-books.store');
        Route::put('return-books/{returnBook:return_book_code}/approve','approve')->name('admin.return-books.approve');
    });

    Route::controller(FineController::class)->group(function(){
        Route::get('fines/{returnBook:return_book_code}/create','create')->name('admin.fines.create');
    });

    Route::controller(AnnouncementController::class)->group(function(){
        Route::get('announcements','index')->name('admin.announcements.index');
        Route::get('announcements/create','create')->name('admin.announcements.create');
        Route::post('announcements/create','store')->name('admin.announcements.store');
        Route::get('announcements/edit/{announcement}','edit')->name('admin.announcements.edit');
        Route::put('announcements/edit/{announcement}','update')->name('admin.announcements.update');
        Route::delete('announcements/destroy/{announcement}','destroy')->name('admin.announcements.destroy');
    });

    Route::controller(RoleController::class)->group(function(){
        Route::get('roles','index')->name('admin.roles.index');
        Route::get('roles/create','create')->name('admin.roles.create');
        Route::post('roles/create','store')->name('admin.roles.store');
        Route::get('roles/edit/{role}','edit')->name('admin.roles.edit');
        Route::put('roles/edit/{role}','update')->name('admin.roles.update');
        Route::delete('roles/destroy/{role}','destroy')->name('admin.roles.destroy');
    });

    Route::controller(PermissionController::class)->group(function(){
        Route::get('permissions','index')->name('admin.permissions.index');
        Route::get('permissions/create','create')->name('admin.permissions.create');
        Route::post('permissions/create','store')->name('admin.permissions.store');
        Route::get('permissions/edit/{permission}','edit')->name('admin.permissions.edit');
        Route::put('permissions/edit/{permission}','update')->name('admin.permissions.update');
        Route::delete('permissions/destroy/{permission}','destroy')->name('admin.permissions.destroy');
    });

    Route::controller(AssignementPermissionController::class)->group(function(){
        Route::get('assignement-permissions','index')->name('admin.assignement-permissions.index');
        Route::get('assignement-permissions/edit/{role}','edit')->name('admin.assignement-permissions.edit');
        Route::put('assignement-permissions/edit/{role}','update')->name('admin.assignement-permissions.update');

    });

    Route::controller(AssignUserController::class)->group(function(){
        Route::get('assign-users','index')->name('admin.assign-users.index');
        Route::get('assign-users/edit/{user}','edit')->name('admin.assign-users.edit');
        Route::put('assign-users/edit/{user}','update')->name('admin.assign-users.update');
    });

    Route::controller(routeAccessController::class)->group(function(){
        Route::get('route-accesses','index')->name('admin.route-accesses.index');
        Route::get('route-accesses/create','create')->name('admin.route-accesses.create');
        Route::post('route-accesses/create','store')->name('admin.route-accesses.store');
        Route::get('route-accesses/edit/{routeAccess}','edit')->name('admin.route-accesses.edit');
        Route::put('route-accesses/edit/{routeAccess}','update')->name('admin.route-accesses.update');
        Route::delete('route-accesses/destroy/{routeAccess}','destroy')->name('admin.permissionroute-accesses.destroy');
    });

});



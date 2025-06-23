<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends Controller
{
    //
    public function index():Response
    {
        // $loans = Loan::query()
        // ->select(['id','loan_code','book_id','user_id','created_at'])
        // ->when(auth()->user()->hasAnyRole(['admin','operator']),function($query){
        //     return $query;
        // });
        return inertia('Dashboard',[
            'page_settings'=> [
                'title'=> 'Dashboard',
                'subtitle'=> 'Menampilkan semua statistik pada platform ini!'
            ]
        ]);
    }
}

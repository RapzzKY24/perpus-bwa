<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\loanStatisticsResource;
use App\Models\Book;
use App\Models\Loan;
use Illuminate\Http\Request;
use Inertia\Response;

class loanStatisticsController extends Controller
{
    //
    public function index():Response
    {
        return inertia('Admin/LoanStatistics/Index',[
            'page_setting'=> [
                'title'=> 'Statistik Peminjaman',
                'subtitle'=> 'Menampilkan statistika Peminjaman Pada Platform ini'
            ],
            'page_data'=> [
                'least_loans_books'=> loanStatisticsResource::collection(Book::leastLoanBooks(5)),
                'most_loans_books'=> loanStatisticsResource::collection(Book::mostLoanBooks(5)),
                'total_loans'=> Loan::totalLoanBooks()
            ]
        ]);
    }
}

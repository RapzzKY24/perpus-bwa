<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\loanFrontResource;
use App\Http\Resources\Admin\loanFrontSingleResource;
use App\Models\Book;
use App\Models\Loan;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class loanFrontController extends Controller
{
    //
    public function index():Response
    {
        $loans = Loan::query()
        ->select(['id','loan_code','user_id','book_id','loan_date','due_date','created_at'])
        ->where('user_id',auth()->user()->id)
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field','direction']))
        ->with(['book','user'])
        ->latest('created_at')
        ->paginate(request()->load ?? 10)
        ->withQueryString();

        return inertia('Front/Loans/Index',[
            'page_setting'=> [
                'title'=> 'Peminjaman',
                'subtitle'=> 'Menampilkan semua peminjaman pada platform ini'
            ],
            'loans'=> loanFrontResource::collection($loans)->additional([
                'meta'=> [
                    'has_pages'=> $loans->hasPages()
                ]
                ]),
                'state'=>[
                    'page' => request()->page ?? 1,
                    'search'=> request()->search ?? "",
                    'load'=> 10
                ]
            ]);
    }

    public function show(Loan $loan):Response{
        return inertia('Front/Loans/Show',[
            'page_setting'=> [
                'title'=> 'Detail Peminjaman Buku',
                'subtitle'=> 'Menampilkan detail informasi buku yang anda pinjam'
            ],
            'loan'=> new loanFrontSingleResource($loan->load(['book','user','returnBook']))
            ]);
    }

    public function store(Book $book):RedirectResponse
    {
       if(Loan::checkLoanBook(auth()->user()->id,$book->id)){
        flashMessage('Anda sudah meminjam buku ini , harap kembalikan terlebih dahulu!','error');
        return to_route('front.books.show',$book->slug);
       };
       if($book->stock->available <= 0){
        flashMessage('Stok Buku tidak tersedia','error');
        return to_route('front.books.show',$book->slug);
       }

       $loan = tap(Loan::create([
        'loan_code' => str()->lower(str()->random(10)),
        'user_id' => auth()->user()->id,
        'book_id' => $book->id,
        'loan_date'=> Carbon::now()->toDateString(),
        'due_date'=>Carbon::now()->addDays(7)->toDateString(),
       ]),function($loan){
        $loan->book->stock_loan();
        flashMessage('Berhasil melakukan peminjaman');
       });
       return to_route('front.loans.index');
    }

}

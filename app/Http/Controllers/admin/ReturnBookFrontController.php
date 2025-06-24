<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\returnBookFrontResource;
use App\Http\Resources\Admin\returnBookFrontSingleResource;
use App\Models\Book;
use App\Models\Loan;
use App\Models\ReturnBook;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ReturnBookFrontController extends Controller
{

    public function index():Response
    {
        $return_books = ReturnBook::query()
        ->select(['id','user_id','book_id','loan_id','return_book_code','return_date','status','created_at'])
        ->where('user_id',auth()->user()->id)
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field','direction']))
        ->with(['book','fine','loan','returnBookCheck','user'])
        ->latest('created_at')
        ->paginate(request()->load ?? 10)
        ->withQueryString();

        return inertia('Front/ReturnBooks/Index',[
            'page_setting' => [
                'title'=> 'Pengembalian',
                'subtitle'=> 'Menampilkan semua peminjaman pada platform ini'
            ],
            'return_books' => returnBookFrontResource::collection($return_books)->additional([
                'meta'=> [
                    'has_pages' => $return_books->hasPages()
                ]
                ]),
                'state' => [
                    'page'=> request()->page ?? 1,
                    'search' => request()->search ?? "",
                    'load' => 10
                ],
                'page_data' => [
                    'returned' => ReturnBook::query()->member(auth()->user()->id)->returned()->count(),
                    'fine'=> ReturnBook::query()->member(auth()->user()->id)->fine()->count(),
                    'checked'=> ReturnBook::query()->member(auth()->user()->id)->checked()->count(),
                ]
        ]);
    }

    public function store(Book $book,Loan $loan):RedirectResponse
    {
        $return_book = $loan->returnBook()->create([
            'return_book_code' => str()->lower(str()->random(10)),
            'book_id' => $book->id,
            'user_id' => auth()->user()->id,
            'return_date'=> Carbon::today()
        ]);
        flashMessage('Buku anda sedang di cek oleh petugas kami');
        return to_route('front.return-books.show',[$return_book->return_book_code]);
    }

    public function show(ReturnBook $returnBook){
        return inertia('Front/ReturnBooks/Show',[
            'page_setting'=> [
                'title'=> 'Detail Pengembalian Buku',
                'subtitle'=> 'Dapat Melihat Informasi Detail Pengembalian Buku Anda'
            ],
            'return_book'=> new returnBookFrontSingleResource($returnBook->load(['book','user','fine','loan','returnBookCheck']))
        ]);
    }

}

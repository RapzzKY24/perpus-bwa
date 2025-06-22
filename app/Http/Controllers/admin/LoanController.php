<?php

namespace App\Http\Controllers\admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoanRequest;
use App\Http\Resources\Admin\LoanResource;
use App\Models\Book;
use App\Models\Loan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;
use Throwable;

class LoanController extends Controller
{
    //
    public function index():Response
    {
        $loans = Loan::query()
        ->select(['id','loan_code','due_date','loan_date','user_id','book_id','created_at'])
        ->filter(request()->only('search'))
        ->sorting(request()->only(['field','direction']))
        ->with(['book','user','returnBook'])
        ->latest('created_at')
        ->paginate(request()->load??10)
        ->withQueryString();
        return inertia('Admin/Loans/Index',[
            'page_setting'=>[
                'title' => 'Peminjaman',
                'subtitle'=> 'Menampilan seluruh data peminjaman pada platfrom ini!',

            ],
            'loans' => LoanResource::collection($loans)->additional([
                'meta'=> [
                    'has_pages'=> $loans->hasPages()
                ],
            ]),
            'state'=> [
                'page'=> request()->page ?? 1,
                'search'=> request()->search ?? "",
                'load'=> 10
            ]
        ]);
    }

    public function create():Response
    {
        return inertia('Admin/Loans/Create',[
            'page_setting' => [
                'title' => 'Tambah Peminjaman',
                'subtitle'=> 'Mari Tambah Peminjaman Buku , jangan lupa simpan!',
                'method' => 'POST',
                'action' => route('admin.loans.store')
            ],
            'page_data' => [
                'date' => [
                    'loan_date' => Carbon::now()->toDateString(),
                    'due_date' => Carbon::now()->addDays(7)->toDateString(),
                ],
                'books' =>Book::query()
                ->select(['id','title'])
                ->whereHas('stock',fn($query)=> $query->where('available','>',0))
                ->get()
                ->map(fn($item)=>[
                    'value' => $item->title,
                    'label' => $item->title,
                ]),
                'users'=> User::query()
                ->select(['id','name'])
                ->get()
                ->map(fn($item)=>[
                    'value' => $item->name,
                    'label' => $item->name
                ])
            ]
        ]);
    }

    public function store(LoanRequest $request):RedirectResponse
    {
        try {
            //code...
            $book = Book::query()
                    ->where('title',$request->book)
                    ->firstOrFail();

            $user = User::query()->where('name',$request->user)->firstOrFail();

            if(Loan::checkLoanBook($user->id,$book->id))
            {
                flashMessage('Pengguna Sudah Meminjan Buku Ini','error');
                return to_route('admin.loans.index');
            }

           $book->stock->available>0
           ? tap( Loan::create([
            'loan_code' => str()->lower(str()->random(10)),
            'user_id' => $user->id,
            'book_id' => $book->id,
            'loan_date'=> Carbon::now()->toDateString(),
            'due_date'=>Carbon::now()->addDays(7)->toDateString(),
           ]),function($loan){
                $loan->book->stock_loan();
                flashMessage("Berhasil menambahkan peminjaman");
           })
           :flashMessage('Maaf,Stock Buku Tidak Tersedia');
            return to_route('admin.loans.index');
        } catch (Throwable $e) {
            //throw $th;
            flashMessage(MessageType::ERROR->message(error :$e ->getMessage()),'error');
            return to_route('admin.loans.index');
        }
    }

    public function edit(Loan $loan):Response
    {
        return inertia('Admin/Loans/Edit',[
            'page_setting' => [
                'title' => 'Edit Peminjaman',
                'subtitle'=> 'Mari Edit Peminjaman Buku , jangan lupa simpan!',
                'method' => 'PUT',
                'action' => route('admin.loans.update',$loan)
            ],
            'page_data' => [
                'date' => [
                    'loan_date' => Carbon::now()->toDateString(),
                    'due_date' => Carbon::now()->addDays(7)->toDateString(),
                ],
                'books' =>Book::query()
                ->select(['id','title'])
                ->whereHas('stock',fn($query)=> $query->where('available','>',0))
                ->get()
                ->map(fn($item)=>[
                    'value' => $item->title,
                    'label' => $item->title,
                ]),
                'users'=> User::query()
                ->select(['id','name'])
                ->get()
                ->map(fn($item)=>[
                    'value' => $item->name,
                    'label' => $item->name
                ]),
                'loan' => $loan->load(['user','book'])
            ]
        ]);
    }

    public function update(Loan $loan,LoanRequest $request):RedirectResponse
    {
        try {
            //code...
            $book = Book::query()
                    ->where('title',$request->book)
                    ->firstOrFail();

            $user = User::query()->where('name',$request->user)->firstOrFail();


            if(Loan::checkLoanBook($user->id,$book->id))
            {
                flashMessage('Pengguna Sudah Meminjan Buku Ini','error');
                return to_route('admin.loans.index');
            }

            $loan->update([
                'user_id' => $user->id,
                'book_id' => $book->id,
            ]);
            flashMessage(MessageType::UPDATED->message('Peminjaman'));
            return to_route('admin.loans.index');
        } catch (Throwable $e) {
            //throw $th;
            flashMessage(MessageType::ERROR->message(error :$e ->getMessage()),'error');
            return to_route('admin.loans.index');
        }
    }

    public function destroy(Loan $loan):RedirectResponse
    {
        try
        {
            $loan->delete();
            flashMessage(MessageType::DELETED->message('Peminjaman'));
            return to_route('admin.loans.index');
        }catch(Throwable $e){
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
            return to_route('admin.loans.index');
        }
    }

}

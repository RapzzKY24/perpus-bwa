<?php

namespace App\Http\Controllers\admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StokBookRequest;
use App\Http\Resources\Admin\stockResource;
use App\Models\Stock;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;

class stockBookController extends Controller
{
    //

    public function index():Response
    {
        $stocks = Stock::query()
        ->with('book')
        ->select(['stocks.id','book_id','damaged','lost','loan','total','available','stocks.created_at'])
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field','direction']))
        // ->distinct()
        ->paginate(request()->load ?? 10)
        ->withQueryString();
        return inertia('Admin/StockBookReports/Index',[
            'page_setting'=> [
                'title'=> 'Laporan Stok Buku',
                'subtitle'=> 'Menampilkan Laporan Stok Buku pada Platform Ini!'
            ],
            'page_data'=> [
                'stocks' => stockResource::collection($stocks)->additional([
                    'meta'=>[
                        'has_pages'=> $stocks->hasPages()
                    ]
                ])
                    ],
                    'state'=> [
                        'page'=> request()->page ?? 1,
                        'search' => request()->search ?? '',
                        'load'=> 10
                    ]
        ]);
    }

    public function edit(Stock $stock):Response
    {
        return inertia('Admin/StockBookReports/Edit',[
            'page_setting'=> [
                'title'=> 'Edit Stok',
                'subtitle'=> 'Silahkan update stok buku anda,jangan lupa save!',
                'method'=> 'PUT',
                'action'=> route('admin.stock-book-reports.update',$stock)
            ],
            'stocks'=> $stock
        ]);
    }

    public function update(Stock $stock,StokBookRequest $request):RedirectResponse
    {
        try{
            $minimumTotal = $request->available + $request->loan + $request->lost +$request->damaged;
            if($request->total < $minimumTotal){
                flashMessage('Total tidak lebih kecil daripada peminjaman,tersedia,hilang,rusak','error');
                return to_route('admin.stock-book-reports.index');
            }
            $stock->update([
                'available'=> $request->available,
                'total'=> $request->total,

            ]);
            flashMessage(MessageType::UPDATED->message('Stok'));
            return to_route('admin.stock-book-reports.index');
        }catch(Throwable $e){
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
            return to_route('admin.stock-book-reports.index');
        }
    }


}

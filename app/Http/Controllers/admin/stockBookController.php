<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\stockResource;
use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Response;

class stockBookController extends Controller
{
    //

    public function index():Response
    {
        $stocks = Stock::query()
        ->select(['stocks.id','book_id','damaged','lost','loan','total','available','stocks.created_at'])
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field','direction']))
        ->paginate(request()->load ?? 10)
        // ->with('book')
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

}

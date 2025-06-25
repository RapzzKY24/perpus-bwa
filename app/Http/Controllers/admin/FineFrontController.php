<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\fineFrontResource;
use App\Models\Fine;
use Illuminate\Http\Request;

class FineFrontController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $fines = Fine::query()
        ->select(['id','return_book_id','user_id','late_fee','other_fee','total_fee','fine_date','payment_status','created_at'])
        ->with(['user','returnBook'])
        ->where('user_id',auth()->user()->id)
        ->paginate(10)
        ->withQueryString();
        return inertia('Front/Fines/Index',[
            'page_setting'=>[
                'title'=> 'Laporan Denda',
                'subtitle'=> 'Laporan denda pada platform ini!'
            ],
            'fines' => fineFrontResource::collection($fines)->additional([
                'meta'=>[
                    'has_pages'=> $fines->hasPages()
                ]
            ])
        ]);
    }
}

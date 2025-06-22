<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ReturnFineSingleResource;
use App\Models\ReturnBook;
use Illuminate\Http\Request;
use Inertia\Response;

class FineController extends Controller
{
    //
    public function create(ReturnBook $returnBook):Response
    {
        return inertia('Admin/Fine/Create',[
            'page_setting' =>[
                'title' => 'Denda',
                'subtitle' => 'Selesaikan Pembayaran Denda Terlebih Dahulu'
            ],
            'return_book' =>  new ReturnFineSingleResource($returnBook->load([
                'book',
                'fine',
                'loan',
                'user',
                'returnBookCheck'
            ]))
        ]);
    }
}

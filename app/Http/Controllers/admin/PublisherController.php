<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PublisherResource;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Inertia\Response;

class PublisherController extends Controller
{
    //
    public function index():Response
    {
        $publisher = Publisher::query()
        ->select([
            'id',
            'name',
            'slug',
            'address',
            'email',
            'phone',
            'logo'
        ])
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field','direction']))
        ->paginate(request()->load ?? 10)
        -> withQueryString();
        return inertia('Admin/Publishers/Index',[
            'publishers' => PublisherResource::collection($publisher)->additional([
                'meta' => [
                    'has_pages' => $publisher->hasPages()
                ]
                ]),
                'page_setting' => [
                    'title' => 'Penulis',
                    'subtitle' => 'Menampilkan semua dafatar penulis'
                ],
                'state' => [
                    'page' => request()->page ??1,
                    'search' => request()->search?? "",
                    'load' => 10
                ]
            ]);
    }



}

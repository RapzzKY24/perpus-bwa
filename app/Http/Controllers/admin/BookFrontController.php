<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\bookFrontSingleResource;
use App\Http\Resources\Admin\CategoryFrontResource;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Response;

class BookFrontController extends Controller
{
    //
    public function index():Response{
        $categories = Category::query()
        ->select(['id','name','slug','cover','created_at'])
        ->whereHas('books') // menampilakn yang ada buku
        ->with([
            'books'=> fn($query)=> $query->limit(4)
        ])
        ->latest('created_at')
        ->get();
        return inertia('Front/Books/Index',[
            'page_setting'=>[
                'title'=> 'Buku',
                'subtitle'=> 'Menampilkan semua buku platform ini'
            ],
            'categories'=> CategoryFrontResource::collection($categories),
        ]);
    }

    public function show(Book $book):Response{
        return inertia('Front/Books/Show',[
            'page_setting'=>[
                'title'=> $book->title,
                'subtitle'=> "Menampilkan detail informasi buku {$book->title}"
            ],
            'book'=> new bookFrontSingleResource($book->load(['category','publisher','stock'])),

            ]);
    }

}

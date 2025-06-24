<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\bookFrontResource;
use App\Http\Resources\Admin\CategoryFrontResource;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Response;

class CategoryFrontController extends Controller
{

    public function index():Response
    {
        $categories = Category::query()
        ->select(['id','name','slug','cover','created_at'])
        ->latest('created_at')
        ->paginate(8);

        return inertia('Front/Categories/Index',[
            'page_setting'=>[
                'title'=> 'Kategori',
                'subtitle'=> 'Menampilkan semua category yang tersedia pada platform ini'
            ],
            'categories'=> CategoryFrontResource::collection($categories)->additional([
                'meta'=> [
                    'has_pages'=> $categories->hasPages()
                ]
            ])
        ]);
    }

    public function show(Category $category):Response
    {
        $books = Book::query()
        ->select(['id','title','slug','status','cover','category_id','synopsis'])
        ->where('category_id',$category->id)
        ->paginate(12);
        return inertia('Front/Categories/Show',[
            'page_setting'=> [
                'title'=> $category->name,
                'subtitle'=> "Menampilkan semua buku yang tersedia pada kategori {$category->name} pada platform ini"
            ],
            'books'=> bookFrontResource::collection($books)->additional([
                'meta'=> [
                    'has_pages'=> $books->hasPages()
                ]
            ])
            ]);
    }

}

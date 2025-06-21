<?php

namespace App\Http\Controllers\admin;

use App\Enums\BookLanguage;
use App\Enums\BookStatus;
use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BookRequest;
use App\Http\Resources\Admin\BookResource;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Traits\Hasfile;
use Throwable;

class BookController extends Controller
{
    //
    use Hasfile;
    public function index():Response
    {
        $books = Book::query()
        -> select(['id','book_code','title','slug','isbn','author','publication_year','cover','status','price','language','number_of_page','category_id','publisher_id','created_at'])
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field','direction']))
        -> with(['category','stock','publisher'])
        -> latest('created_at')
        ->paginate(request()->load ?? 10)
        ->withQueryString();
        return inertia('Admin/Books/Index',[
            'books' => BookResource::collection($books)->additional([
                'meta' => [
                    'has_pages' => $books->hasPages()
                ],
                ]),
                'page_setting' => [
                    'title' => 'Buku',
                    'subtitle' => 'Menampilkan semua daftar buku',

                ],
                'state' => [
                    'pages' => request()-> page ?? 1,
                    'search' => request()-> search ?? '',
                    'load' => 10
                ]
        ]);
    }

    public function create():Response
    {
        return inertia('Admin/Books/Create',[
            'page_setting' => [
                'title' => 'Tambah Buku',
                'subtitle' => 'Menambahkan Buku , Jangan Lupa Simpan!',
                'method' => 'POST',
                'action' => route('admin.books.store')
            ],
            'page_data' => [
                'publicationYears' => range(2000,now()->year),
                'languages' => BookLanguage::options(),
                'categories' => Category::query()->select('id','name')->get()->map(fn($item)=>[
                    'value' => $item->id,
                    'label' => $item->name
                ]),
                'publishers' => Publisher::query()->select('id','name')->get()->map(fn($item)=>[
                    'value' => $item->id,
                    'label' => $item->name
                ]),
            ]
        ]);
    }

    public function store(BookRequest $request):RedirectResponse
    {
        try {
            //code...
            $book= Book::create([
                'book_code' => $this->bookCode(
                    $request->publication_year,
                   $request->category_id,
                ),
                'title' => $title = $request->title,
                'slug' => str()->lower(str()->slug($title).str()->random(4)),
                'author' => $request->author,
                'publication_year' => $request->publication_year,
                'isbn' => $request->isbn,
                'language' => $request->language,
                'synopsis' => $request->synopsis,
                'number_of_page'=> $request->number_of_pages,
                'status'=> $request->total>0 ? BookStatus::AVAILABLE->value : BookStatus::UNAVAILABLE->value,
                'cover' => $this->upload_file($request,'cover','books'),
                'price' => $request->price,
                'category_id'=>$request->category_id,
                'publisher_id' => $request->publisher_id
            ]);
            $book->stock()->create([
                'total' => $total =$request->total,
                'available' => $total
            ]);
            flashMessage(MessageType::CREATED->message('Buku'));
            return to_route('admin.books.index');
        } catch (Throwable $e) {
            //throw $th;
            flashMessage(MessageType::ERROR ->message(error:$e->getMessage()),'error');
            return to_route('admin.books.index');
        }
    }

    public function edit(Book $book):Response
    {
        return inertia('Admin/Books/Edit',[
            'page_setting' => [
                'title' => 'Edit Buku',
                'subtitle' => 'Edit Buku , Jangan Lupa Simpan!',
                'method' => 'PUT',
                'action' => route('admin.books.update',$book)
            ],
            'book' => $book,
            'page_data' => [
                'publicationYears' => range(2000,now()->year),
                'languages' => BookLanguage::options(),
                'categories' => Category::query()->select('id','name')->get()->map(fn($item)=>[
                    'value' => $item->id,
                    'label' => $item->name
                ]),
                'publishers' => Publisher::query()->select('id','name')->get()->map(fn($item)=>[
                    'value' => $item->id,
                    'label' => $item->name
                ]),
            ]
        ]);
    }


    public function update(Book $book,BookRequest $request):RedirectResponse
    {
        try {
            //code...
            $book -> update([
                'title' => $title =$request->title,
                'slug' =>$title !== $book->title ? str()->lower(str()->slug($title).str()->random(4)) : $book->slug,
                'author' => $request->author,
                'publication_year' => $request->publication_year,
                'isbn' => $request->isbn,
                'language' => $request->language,
                'synopsis' => $request->synopsis,
                'number_of_page'=> $request->number_of_pages,
                'status'=> $request->total>0 ? BookStatus::AVAILABLE->value : BookStatus::UNAVAILABLE->value,
                'cover' => $this->update_file($request,$book,'cover','books'),
                'price' => $request->price,
                'category_id'=>$request->category_id,
                'publisher_id' => $request->publisher_id

            ]);
            flashMessage(MessageType::UPDATED->message('Penulis'));
            return to_route('admin.books.index');
        } catch (Throwable $e) {
            //throw $th;
            flashMessage(MessageType::ERROR->message(error :$e ->getMessage()),'error');
            return to_route('admin.books.index');
        }
    }

    public function destroy(Book $book):RedirectResponse
    {
        try {
            //code...
            $this->delete_file($book,'cover');
            $book->delete();
            flashMessage(MessageType::DELETED->message('Buku'));
            return to_route('admin.books.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error :$e ->getMessage()),'error');
            return to_route('admin.books.index');
        }
    }



    private function bookCode(int $publication_year,int $category_id):string
    {
        $category = Category::find($category_id);
        $last_book = Book::query()
        ->orderByDesc('book_code')
        ->first();
        $order = 1;
        if($last_book){
            $last_order =(int) substr($last_book->book_code,-4);
            $order = $last_order+1;

        }
        $ordering = str_pad($order,4,'0'.STR_PAD_LEFT);
        return 'BH'.$publication_year.'.'.str()->slug($category->name).'.'.$ordering;
    }

}

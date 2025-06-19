<?php

namespace App\Http\Controllers\admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Http\Resources\Admin\CategoryResource;
use App\Models\Category;
use App\Traits\Hasfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CategoryController extends Controller
{
    //

    use Hasfile;

    public function index () :Response
    {
        $categories = Category::query()
        ->select(['id','name','slug','description','cover','created_at'])
        ->get();
        return inertia('Admin/Categories/Index',[
            'categories'=> CategoryResource::collection($categories),
            'page_setting'=> [
                'title' => 'Kategori',
                'subtitle'=> 'Menampilkan semua daftar kategori yang tersedia pada plafrom ini'
            ],
        ]);
    }

    public function create():Response
    {
        return inertia('Admin/Categories/Create',[
            'page_setting' => [
                'title' => 'Tambah Kategori',
                'subtitle' => 'Buat kategori baru disini,klik simpan setelah selesai',
                'method' => 'POST',
                'action'=> route('admin.categories.store'),
            ]
        ]);

    }

    public function store(CategoryRequest $request):RedirectResponse
    {
       try {
        //code...
        Category::create([
            'name' => $name = $request -> name,
            'description' => $request->description,
            'cover' => $this->upload_file($request,'cover','categories'),
            'slug' => str()->lower(str()->slug($name).str()->random(4))
        ]);

        flashMessage(MessageType::CREATED->message('Kategori'));
        return to_route('admin.categories.index');
       } catch (Throwable $e) {
        //throw $th;
        flashMessage(MessageType::ERROR->message(error :$e ->getMessage()),'error');
        return to_route('admin.categories.index');
       }
    }

    public function edit(Category $category):Response
    {
        return inertia('Admin/Categories/Edit',[
            'page_setting' => [
                'title' => 'Edit Kategori',
                'subtitle' => 'Edit Kategori Disini , Simpan Setelah Selesai',
                'method' => 'PUT',
                'action'=> route('admin.categories.update',$category)
            ],
            'category' => $category
        ]);
    }

    public function update(Category $category,CategoryRequest $request):RedirectResponse
    {
        try {
            //code...
            $category -> update([
                'name' => $name = $request -> name,
                'description' => $request->description,
                'cover' => $this->update_file($request,$category,'cover','categories'),
                'slug' =>$name !== $category->name ? str()->lower(str()->slug($name).str()->random(4)) : $category->slug
            ]);
            flashMessage(MessageType::UPDATED->message('Kategori'));
            return to_route('admin.categories.index');
        } catch (Throwable $e) {
            //throw $th;
            flashMessage(MessageType::ERROR->message(error :$e ->getMessage()),'error');
            return to_route('admin.categories.index');
        }
    }

    public function destroy(Category $category):RedirectResponse
    {
        try {
            //code...
            $this->delete_file($category,'cover');
            $category -> delete();
            flashMessage(MessageType::DELETED->message('Kategori'));
            return to_route('admin.categories.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error :$e ->getMessage()),'error');
            return to_route('admin.categories.index');
        }
    }

}

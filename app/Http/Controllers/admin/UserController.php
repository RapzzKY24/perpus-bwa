<?php

namespace App\Http\Controllers\admin;

use App\Enums\MessageType;
use App\Enums\UserGender;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BookRequest;
use App\Http\Requests\Admin\UserRequest;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use App\Traits\Hasfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;
use Inertia\Response;
use Throwable;

class UserController extends Controller
{
    //
    use Hasfile;
    public function index():Response
    {
        $users = User::query()
        ->select([
            'id',
            'email',
            'name',
            'username',
            'email',
            'phone',
            'avatar',
            'gender',
            'date_of_birth',
            'address',
            'created_at'
        ])
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field'],['direction']))
        ->latest('created_at')
        ->paginate(request()->load ?? 10)
        ->withQueryString();
        return inertia('Admin/Users/index',[
            'users' => UserResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages()
                ]
            ]),
            'page_setting' => [
                'title' => 'Pengguna',
                'subtitle' => 'Menampilkan seluruh pengguna yang tersedia dia platfrom ini!'
            ],
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? "",
                'load' => 10
            ]
        ]);
    }

    public function create():Response{
        return inertia('Admin/Users/Create',[
            'page_setting' => [
                'title' => 'Tambah Pengguna',
                'subtitle' => 'Mari Tambahkan Pengguna , jangan lupa klik simpan!',
                'method' => 'POST',
                'action' => route('admin.users.store')
            ],
            'page_data' => [
                'genders' => UserGender::options()
            ]
        ]);
    }

    public function store(UserRequest $request):RedirectResponse
    {
        try {
            User::create([
                'name' => $name= $request->name,
                'username'=> usernameGenerator($name),
                'email' => $request->email,
                'password'=> Hash::make(request()->password),
                'phone'=>$request->phone,
                'gender' => $request->gender,
                'address'=>$request->address,
                'date_of_birth'=>$request->date_of_birth,
                'avatar'=> $this->upload_file($request,'avatar','users'),
            ]);
            flashMessage(MessageType::CREATED->message('Pengguna'));
            return to_route('admin.users.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error :$e ->getMessage()),'error');
            return to_route('admin.users.index');
        }
    }

    public function edit(User $user):Response{
        return inertia('Admin/Users/Edit',[
            'page_setting' => [
                'title' => 'Edit Pengguna',
                'subtitle' => 'Mari Edit Pengguna , jangan lupa klik simpan!',
                'method' => 'PUT',
                'action' => route('admin.users.update',$user)
            ],
            'page_data' => [
                'genders' => UserGender::options()
            ],
            'user'=> $user
        ]);
    }

    public function update(User $user,UserRequest $request):RedirectResponse
    {
        try {
            $user->update([
                'name' => $name= $request->name,
                'username'=> usernameGenerator($name),
                'email' => $request->email,
                'password'=> Hash::make(request()->password),
                'phone'=>$request->phone,
                'gender' => $request->gender,
                'address'=>$request->address,
                'date_of_birth'=>$request->date_of_birth,
                'avatar'=> $this->update_file($request,$user,'avatar','users'),
            ]);
            flashMessage(MessageType::UPDATED->message('Pengguna'));
            return to_route('admin.users.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error :$e ->getMessage()),'error');
            return to_route('admin.users.index');
        }
    }

    public function destroy(User $user):RedirectResponse
    {
        try {
            $this->delete_file($user,'logo');
            $user -> delete();
            flashMessage(MessageType::DELETED-> message('Pengguna'));
            return to_route('admin.users.index');
        }catch(Throwable $e){
            flashMessage(MessageType::ERROR->message(error :$e ->getMessage()),'error');
            return to_route('admin.users.index');
        }
    }

}

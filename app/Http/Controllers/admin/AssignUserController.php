<?php

namespace App\Http\Controllers\admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\assignUserRequest;
use App\Http\Resources\Admin\assignUserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Throwable;

class AssignUserController extends Controller
{
    //
    public function index():Response{
        $users = User::query()
        ->select(['id','username','email'])
        ->when(request()->search,function($query,$search){
            $query->where( 'username' ,'REGEXP',$search);
        })
        ->when(request()->field && request()->direction,fn($query)=> $query->orderBy(request()->field,request()->direction))
        ->with('roles')
        ->paginate(request()->load??10)
        ->withQueryString();
        return inertia('Admin/AssignUser/Index',[
            'page_setting' => [
                'title' => 'Tetapkan Peran',
                'subtitle' => 'Menampilkan semua daftar tetapkan peran di platform ini!'
            ],
            'users' => assignUserResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages()
                ]
            ])
        ]);
    }

    public function edit(User $user):Response
    {
        return inertia('Admin/AssignUser/Edit',[
            'page_setting' => [
                'title' => 'Sinkronisasi peran',
                'subtitle'=> 'Sinkronisasi Peran Anda Disini,Jangan lupa Simpan',
                'method'=> 'PUT',
                'action'=> route('admin.assign-users.update',$user)
            ],
            'user' => $user->load('roles'),
            'roles'=> Role::query()->select(['id','name'])->where('guard_name','web')->get()->map(fn($item)=> [
                'value' => $item->id,
                'label'=> $item->name
            ])
        ]);
    }

    public function update(assignUserRequest $request, User $user):RedirectResponse
    {
       try{
            $user-> syncRoles($request->roles);
            flashMessage("Berhasil Menyinkronkan peran ke pengguna{$user->name}");
            return to_route('admin.assign-users.index');
       }catch(Throwable $e){
        flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
        return to_route('admin.assign-users.index');
       }
    }


}

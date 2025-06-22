<?php

namespace App\Http\Controllers\admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RoleRequest;
use App\Http\Resources\Admin\RoleResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Throwable;

class RoleController extends Controller
{
    //
    public function index():Response{
        $roles = Role::query()
        ->select(['id','name','guard_name','created_at'])
        ->when(request()->search,function($query,$search){
            $query->whereAny([
                'name',
                'guard_name'
            ],'REGEXP',$search);
        })
        ->when(request()->field && request()->direction,fn($query)=> $query->orderBy(request()->field,request()->direction))
        ->paginate(request()->load??10)
        ->withQueryString();
        return inertia('Admin/Roles/Index',[
            'page_setting' => [
                'title' => 'Peran',
                'subtitle' => 'Menampilkan semua daftar peran di platform ini!'
            ],
            'roles' => RoleResource::collection($roles)->additional([
                'meta' => [
                    'has_pages' => $roles->hasPages()
                ]
            ])
        ]);
    }

    public function create():Response{
        return inertia('Admin/Roles/Create',[
            'page_setting' => [
                'title' => 'Tambah Peram',
                'subtitle' => 'Mari Menambahkan Peran ,jangan lupa klik save!',
                'method' => 'POST',
                'action' => route('admin.roles.store')
            ],
            'state' => [
                'page'=> request()->page ?? 1,
                'search'=> request()->search ?? "",
                'load'=> 10
            ]
        ]);
    }
    
    public function store(RoleRequest $request):RedirectResponse
    {
        try{
            Role::create([
                'name' => $request->name,
                'guard_name'=> $request->guard_name,
            ]);
            flashMessage(MessageType::CREATED->message('Peran'));
            return to_route('admin.roles.index');
        }catch(Throwable $e){
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
            return to_route('admin.roles.index');
        }
    }

    public function edit(Role $role):Response{
        return inertia('Admin/Roles/Edit',[
            'page_setting' => [
                'title' => 'Edit Peram',
                'subtitle' => 'Mari Edit Peran ,jangan lupa klik save!',
                'method' => 'PUT',
                'action' => route('admin.roles.update',$role)
            ],
            'roles'=> $role
        ]);
    }

    public function update(RoleRequest $request,Role $role):RedirectResponse
    {
        try{
            $role->update([
                'name' => $request->name,
                'guard_name'=> $request->guard_name,
            ]);
            flashMessage(MessageType::UPDATED->message('Peran'));
            return to_route('admin.roles.index');
        }catch(Throwable $e){
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
            return to_route('admin.roles.index');
        }
    }

    public function destroy(Role $role):RedirectResponse{
        try {
            //code...
            $role->delete();
            flashMessage(MessageType::DELETED->message('Peran'));
            return to_route('admin.roles.index');
        } catch (Throwable $e) {
            //throw $th;
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
            return to_route('admin.roles.index');
        }
    }

}

<?php

namespace App\Http\Controllers\admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PermissionRequest;
use App\Http\Resources\Admin\PermissionResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Throwable;

class PermissionController extends Controller
{
    //
    public function index():Response{
        $permissions = Permission::query()
        ->select(['id','name','guard_name','created_at'])
        ->when(request()->search,function($query,$search){
            $query->where( 'name','REGEXP',$search);
        })
        ->when(request()->field && request()->direction,fn($query)=> $query->orderBy(request()->field,request()->direction))
        ->paginate(request()->load??10)
        ->withQueryString();
        return inertia('Admin/Permissions/Index',[
            'page_setting' => [
                'title' => 'Peran',
                'subtitle' => 'Menampilkan semua daftar peran di platform ini!'
            ],
            'permissions' => PermissionResource::collection($permissions)->additional([
                'meta' => [
                    'has_pages' => $permissions->hasPages()
                ]
            ])
        ]);
    }

    public function create():Response{
        return inertia('Admin/Permissions/Create',[
            'page_setting' => [
                'title' => 'Tambah Izin',
                'subtitle' => 'Mari Menambahkan Izin ,jangan lupa klik save!',
                'method' => 'POST',
                'action' => route('admin.permissions.store')
            ],
            'state' => [
                'page'=> request()->page ?? 1,
                'search'=> request()->search ?? "",
                'load'=> 10
            ]
        ]);
    }

    public function store(PermissionRequest $request):RedirectResponse
    {
        try{
            Permission::create([
                'name' => $request->name,
                'guard_name'=> $request->guard_name,
            ]);
            flashMessage(MessageType::CREATED->message('Izin'));
            return to_route('admin.permissions.index');
        }catch(Throwable $e){
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
            return to_route('admin.permissions.index');
        }
    }

    public function edit(Permission $permission):Response{
        return inertia('Admin/Permissions/Edit',[
            'page_setting' => [
                'title' => 'Edit Peram',
                'subtitle' => 'Mari Edit Peran ,jangan lupa klik save!',
                'method' => 'PUT',
                'action' => route('admin.permissions.update',$permission)
            ],
            'permissions'=> $permission
        ]);
    }

    public function update(PermissionRequest $request,Permission $permission):RedirectResponse
    {
        try{
            $permission->update([
                'name' => $request->name,
                'guard_name'=> $request->guard_name,
            ]);
            flashMessage(MessageType::UPDATED->message('Izin'));
            return to_route('admin.permissions.index');
        }catch(Throwable $e){
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
            return to_route('admin.permissions.index');
        }
    }

    public function destroy(Permission $permission):RedirectResponse{
        try {
            //code...
            $permission->delete();
            flashMessage(MessageType::DELETED->message('Peran'));
            return to_route('admin.permissions.index');
        } catch (Throwable $e) {
            //throw $th;
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
            return to_route('admin.permissions.index');
        }
    }


}

<?php

namespace App\Http\Controllers\admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\assignementPermissionRequest;
use App\Http\Resources\Admin\assignementPermissionResource;
use App\Http\Resources\Admin\PermissionResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Throwable;

class AssignementPermissionController extends Controller
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
        ->with('permissions')
        ->paginate(request()->load??10)
        ->withQueryString();
        return inertia('Admin/AssignementPermissions/Index',[
            'page_setting' => [
                'title' => 'Tetapkan Izin',
                'subtitle' => 'Menampilkan semua daftar tetapkan izin di platform ini!'
            ],
            'roles' => assignementPermissionResource::collection($roles)->additional([
                'meta' => [
                    'has_pages' => $roles->hasPages()
                ]
            ])
        ]);
    }

    public function edit(Role $role):Response
    {
        return inertia('Admin/AssignementPermissions/Edit',[
            'page_setting' => [
                'ttile' => 'Sinkronisasi Izin',
                'subtitle'=> 'Lakukan Sinkronisasi Izin Disini , klik simpan jika selesai!',
                'method'=> 'PUT',
                'action'=> route('admin.assignement-permissions.update',$role)
            ],
            'role'=> $role->load('permissions'),
            'permissions'=> Permission::query()->select(['id','name'])->where('guard_name','web')->get()->map(fn($item)=> [
                'value' => $item->id,
                'label'=> $item->name
            ])
        ]);
    }

    public function update(assignementPermissionRequest $request, Role $role):RedirectResponse
    {
       try{
            $role-> syncPermissions($request->permissions);
            flashMessage("Berhasil Menyinkronkan ke Peran{$role->name}");
            return to_route('admin.assignement-permissions.index');
       }catch(Throwable $e){
        flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
        return to_route('admin.assignement-permissions.index');
       }
    }


}

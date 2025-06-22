<?php

namespace App\Http\Controllers\admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AnnouncementRequest;
use App\Http\Resources\Admin\AnnouncementResource;
use App\Models\Announcement;
use App\Models\Announcment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;

class AnnouncementController extends Controller
{
    //
    public function index():Response
    {
        $announcements =Announcement::query()
        ->select(['id','message','url','is_active','created_at'])
        ->paginate(request()->load??10)
        ->withQueryString();
        return inertia('Admin/Announcements/Index',[
            'page_setting' => [
                'title' => 'Pengumuman',
                'subtitle'=> 'Menampilkan semua Daftar Pengumuman di Platform Ini !'
            ],
            'announcements' => AnnouncementResource::collection($announcements)->additional([
                'meta' => [
                        'has_pages' => $announcements->hasPages()
                ],
            ]),
        ]);
    }

    public function create():Response
    {
        return inertia('Admin/Announcements/Create',[
            'page_setting' => [
                'title' => 'Tambah Pengumuman',
                'subtitle' => 'Tambah Pengumuman anda disini,jangan lupa klik save!',
                'method' => 'POST',
                'action' => route('admin.announcements.store')
            ]
        ]);
    }

    public function store(AnnouncementRequest $request):RedirectResponse
    {
        try {
            //code...
            if($request->is_active){
                Announcement::where('is_active',true)->update(['is_active'=>false]);
            }
            Announcement::create([
                'message'=> $request->message,
                'url' => $request->url,
                'is_active' => $request->is_active
            ]);
            flashMessage(MessageType::CREATED->message('Pengumuman'));
            return to_route('admin.announcements.index');
        } catch (Throwable $e) {
            //throw $th;
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
            return to_route('admin.announcements.index');
        }
    }


    public function edit(Announcement $announcement):Response
    {
        return inertia('Admin/Announcements/Edit',[
            'page_setting' => [
                'title' => 'Edit Pengumuman',
                'subtitle' => 'Edit Pengumuman anda disini,jangan lupa klik save!',
                'method' => 'put',
                'action' => route('admin.announcements.update',$announcement)
            ],
            'announcements'=> $announcement
        ]);
    }

    public function update(AnnouncementRequest $request,Announcement $announcement):RedirectResponse
    {
        try {
            //code...
            if($request->is_active){
                Announcement::where('is_active',true)
                ->whereNot('id',$announcement->id)
                ->update(['is_active'=>false]);
            }
            $announcement->update([
                'message'=> $request->message,
                'url' => $request->url,
                'is_active' => $request->is_active
            ]);
            flashMessage(MessageType::UPDATED->message('Pengumuman'));
            return to_route('admin.announcements.index');
        } catch (Throwable $e) {
            //throw $th;
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
            return to_route('admin.announcements.index');
        }
    }



    public function destroy(Announcement $announcement):RedirectResponse
    {
        try{
            $announcement->delete();
            flashMessage(MessageType::DELETED->message('Pengumuman'));
            return to_route('admin.announcements.index');
        }catch(Throwable $e){
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()),'error');
            return to_route('admin.announcements.index');
        }
    }

}

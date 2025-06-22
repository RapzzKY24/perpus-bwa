<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AnnouncementResource;
use App\Models\Announcement;
use App\Models\Announcment;
use Illuminate\Http\Request;
use Inertia\Response;

class AnnouncementController extends Controller
{
    //
    public function index():Response
    {
        $announcements =Announcement::query()
        ->select(['id','message','url','is_active'])
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
}

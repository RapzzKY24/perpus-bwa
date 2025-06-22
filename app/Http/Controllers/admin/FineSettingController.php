<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FineSettingRequest;
use App\Models\FineSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class FineSettingController extends Controller
{
    //
    public function create():Response
    {
        $fine_setting= FineSetting::first();
        return inertia('Admin/FineSetting/Create',[
            'page_setting'=>[
                'title' =>'Pengaturan Denda',
                'subtitle' => 'Konfigurasi Pengaturan Denda Disini,Klik Simpan Jika Selesai',
                'method'=> 'PUT',
                'action'=> route('admin.fine-settings.store'),
            ],
            'fine_setting'=> $fine_setting
        ]);
    }

    public function store(FineSettingRequest $request):RedirectResponse
    {
        $fine_setting = FineSetting::updateOrCreate(
            [

            ],
            [
                'lost_fee_percented' => $request -> lost_fee_percented,
                'damaged_fee_percented' => $request -> damaged_fee_percented,
                'late_fee_per_day' => $request-> late_fee_per_day,
            ]
        );
        flashMessage('Berhasil Melakukan Perubahan Pengaturan Denda');
        return to_route('admin.fine-settings.create');
    }

}

<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait Hasfile
{
    public function upload_file(Request $request,string $coloum,string $folder):?string{
        return $request->hasFile($coloum)? $request->file($coloum)->store($folder) : null;
    }

    public function update_file(Request $request,Model $model,string $coloum,string $folder):?string{
        if($request->hasFile($coloum))
        {
            if($model->$coloum){
                Storage::delete($model->$coloum);
            }
            $thumbnail = $request->file($coloum)->store($folder);
        }else{
            $thumbnail = $model->$coloum;
        }
        return $thumbnail;
    }

    public function delete_file(Model $model,string $coloum):void{
        if ($model->$coloum){
            Storage::delete($model->$coloum);
        }
    }
}

<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CategoryFrontResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'slug'=> $this->slug,
            'name'=> $this->name,
            'cover' => $this->cover ? Storage::url($this->cover) : null,
            'books'=> bookFrontResource::collection($this->whenLoaded('books'))
        ];
    }
}

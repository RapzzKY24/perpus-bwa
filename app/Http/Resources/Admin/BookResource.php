<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'book_code' => $this->book_code,
            'title' => $this->title,
            'slug' => $this->slug,
            'author' => $this->author,
            'isbn' => $this->isbn,
            'price' => number_format($this->price,0,',','.'),
            'status' => $this->status,
            'publication_year' => $this->publication_year,
            'cover' => $this->cover ? Storage::url($this->cover) : null,
            'number_of_pages' => $this->number_of_page,
            'language' => $this->language,
            'created_at' => $this->created_at->format('d M Y'),
            'category'=>[
                'id' => $this->category?->id,
                'name' => $this->category?->name,
            ],
            'publisher' => [
                'id' => $this->publisher?->id,
                'name' => $this->publisher?->name,
            ],
            'stock' => [
                'total' => $this->stock?->total,
                'available' => $this->stock?->available,
                'loan' => $this->stock?->loan,
                'lost' => $this->stock?->lost,
                'damaged' => $this->stock?->damaged,
            ]
        ];
    }
}

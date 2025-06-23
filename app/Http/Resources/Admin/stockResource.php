<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class stockResource extends JsonResource
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
            'total'=> $this->total,
            'available'=> $this->available,
            'loan'=> $this->loan,
            'damaged' => $this->damaged,
            'lost'=> $this->lost,
            'created_at'=> $this->created_at->format('d M Y'),
            'book' => [
                'id'=> $this->book?->id,
                'title'=> $this->book?->title
            ]
        ];
    }
}

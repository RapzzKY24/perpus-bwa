<?php

namespace App\Http\Resources\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class returnBookFrontSingleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id'=> $this->id,
            'return_book_code' => $this->return_book_code,
            'return_date'=> $this->return_date ? Carbon::parse($this->return_date)->format('d M Y') : null,
            'status'=> $this->status,
            'created_at'=> $this->created_at->format('d M Y'),
            'daysate' => $this->dayslate,
            'user' => $this->whenLoaded('user',[
                'id'=> $this->user?->id,
                'name'=> $this->user?->name
            ]),
            'book'=> $this->whenLoaded('book',[
                'id'=> $this->book?->id,
                'title'=> $this->book?->title,
                'slug'=> $this->book?->slug,
                'cover'=> $this->book?->cover ? Storage::url($this->book?->cover) : null,
                'synopsis'=> $this->book?->synopsis
            ]),
            'loan' => $this->whenLoaded('loan',[
                'id'=> $this->loan?->id,
                'loan_code' => $this->loan?->loan_code,
                'loan_date'=> Carbon::parse($this->loan?->loan_date)->format('d M Y'),
                'due_date'=> Carbon::parse($this->loan?->due_date)->format('d M Y'),
            ]),
            'fine' => $this->whenLoaded('fine',[
                'id'=> $this->fine?->id,
                'late_fee'=> $this->fine?->late_fee,
                'other_fee'=> $this->fine?->other_fee,
                'total_fee'=> $this->fine?->total_fee,
                'payment_status'=> $this->fine?->payment_status,
            ]),
            'return_book_check' => $this->whenLoaded('returnBookCheck',[
                'condition'=> $this->returnBookCheck?->condition,
                'notes' => $this->returnBookCheck?->notes
            ]),
        ];
    }
}

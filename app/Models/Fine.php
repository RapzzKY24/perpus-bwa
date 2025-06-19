<?php

namespace App\Models;

use App\Enums\FinePaymentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fine extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'return_book_id',
        'user_id',
        'late_fee',
        'other_fee',
        'total_fee',
        'fine_date',
        'payment_status',
    ];

    protected function casts():array{
        return [
            'fine_date'=>'date',
            'payment_status'=> FinePaymentStatus::class,
        ];
    }
}

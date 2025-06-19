<?php

namespace App\Models;

use App\Enums\ReturnBookCondition;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReturnBookCheck extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'return_book_id',
        'condition',
        'notes',
    ];

    protected function casts():array{
        return [
            'condition' => ReturnBookCondition::class,
        ];
    }

    public function returnBook():BelongsTo{
        return $this->belongsTo(ReturnBook::class);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stock extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'book_id',
        'total',
        'available',
        'loan',
        'lost',
        'damaged',
    ];

    public function book():BelongsTo{
        return $this->belongsTo(Book::class);
    }

}

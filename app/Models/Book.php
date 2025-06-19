<?php

namespace App\Models;

use App\Enums\BookLanguage;
use App\Enums\BookStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Book extends Model
{
    //
    use HasFactory;

    protected $fillable= [
        'book_code',
        'title',
        'slug',
        'author',
        'publicated_year',
        'isbn',
        'language',
        'synopsis',
        'number_of_page',
        'status',
        'cover',
        'price',
        'category_id',
        'publisher_id'
    ];

    protected function casts():array
    {
        return [
            'language' => BookLanguage::class,
            'status'=> BookStatus::class
        ];
    }

    public function category():BelongsTo{  // relasi category many to one
        return $this->belongsTo(Category::class);
    }

    public function stock():HasOne{ // buku hanya memiliki 1 stock(one to one)
        return $this->hasOne(Stock::class);
    }

    public function loans():HasMany{ // buku bisa dipinjam oleh banyak pengunjung
        return $this->hasMany(loan::class);
    }

    public function publisher():BelongsTo{ // 1 buku hanya ditulis oleh 1 penulis
        return $this->belongsTo(Publisher::class);
    }


}

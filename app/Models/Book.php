<?php

namespace App\Models;

use App\Enums\BookLanguage;
use App\Enums\BookStatus;
use App\Observers\BookObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[ObservedBy(BookObserver::class)]

class Book extends Model
{
    //
    use HasFactory;

    protected $fillable= [
        'book_code',
        'title',
        'slug',
        'author',
        'publication_year',
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

    public function scopeFilter(Builder $query,array $filters):void
    {
        $query->when($filters['search']?? null,function($query,$search){
            $query->where(function($query)use($search){
                $query->whereAny([
                    'book_code',
                    'title',
                    'author',
                    'slug',
                    'publication_year',
                    'isbn',
                    'language',
                    'status'

                ],'REGEXP',$search);
            });
        });
    }

   public function scopeSorting(Builder $query,array $sorts):void
    {
        $query->when($sorts['field']??null && $sorts['direction']?? null,function($query)use($sorts){
            $query->orderBy($sorts['field'],$sorts['direction']);
        });
    }

    public function update_stock($coloumToDecrement,$coloumToIncrement)
    {
        if($this->stock->$coloumToDecrement>0){
            return $this->stock()->update([
                $coloumToDecrement => $this->stock->$coloumToDecrement-1,
                $coloumToIncrement => $this->stock->$coloumToIncrement+1
            ]);
        }
        return false;
    }

    public function stock_loan(){
        return $this->update_stock('available','loan');
    }

    public function stock_lost(){
        return $this->update_stock('loan','lost');
    }

    public function stock_damage(){
        return $this->update_stock('loan','damaged');
    }

    public function stock_loan_return(){
        return $this->update_stock('loan','available');
    }

}

<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserGender;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Request;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
        'avatar',
        'phone',
        'date_of_birth',
        'address',
        'gender'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'gender' => UserGender::class,
            'date_of_birth' => 'date'
        ];
    }

    public function scopeFilter(Builder $query,array $filters):void
    {
        $query->when($filters['search']?? null,function($query,$search){
            $query->where(function($query)use($search){
                $query->whereAny([
                    'name',
                    'username',
                    'email',
                    'gender',
                    'phone'
                ],'REGEXP',$search);
            });
        });
    }

    public function scopeSorting(Builder $query,array $sorts):void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null,function($query,$sorts){
            $query->orderBy($sorts['field'],$sorts['direction']);
        });
    }

}

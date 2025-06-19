<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FineSetting extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'late_fee_per_date',
        'damaged_fee_percented',
        'lost_fee_per_percented'
    ];
}

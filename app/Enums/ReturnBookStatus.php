<?php

namespace App\Enums;

enum ReturnBookStatus :string
{
    case RETURNED = 'Dikembalikan';
    case FINE = 'Denda';
    case CHECKED = 'Pengecekan';

    public static function options() :array
    {
        return collect(self::cases())->map(fn($item)=>[
            'value'=>$item->value,
            'label'=>$item->name
        ])->values()->toArray();
    }

}

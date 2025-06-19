<?php

namespace App\Enums;

enum ReturnBookCondition :string
{
    case DAMAGED= 'Rusak';
    case LOST = 'Hilang';
    case GOOD = 'Bagus';

    public static function options():array
    {
        return collect(self::cases())->map(fn($item)=>[
            'value'=>$item->value,
            'label'=>$item->name
        ])->values()->toArray();
    }

}

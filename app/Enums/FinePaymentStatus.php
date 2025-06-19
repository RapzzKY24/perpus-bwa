<?php

namespace App\Enums;

enum FinePaymentStatus :string
{
    case PENDING = 'Tertunda';
    case FAILED = 'Gagal';
    case SUCCESS = 'Berhasil';

    public static function options():array
    {
        return collect(self::cases())->map(fn($item)=>[
            'value'=>$item->value,
            'label'=>$item->name
        ])->values()->toArray();
    }

}

<?php

namespace App\Enums;

enum BookLanguage : string {
    case INDONESIA = 'Indonesia';
    case ENGLISH = 'Inggris';
    case JAPAN = 'Jepang';

    public static function options():array
    {
        return collect(self::cases())->map(fn($item)=>[
            'value' => $item->value,
            'label'=> $item->name,
        ])->values()->toArray();
    }

}

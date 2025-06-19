<?php

namespace App\Enums;

enum UserGender : string
{
    case MALE = 'Laki-laki';
    case FEMALE = 'Perempuan';
    case OTHER = 'Lainnya';
    case NOT_SPECIFIED = 'Tidak ditentukan';
    case PREFER_NOT_TO_SAY = 'Lebih suka tidak mengatakan';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name
        ])->values()->toArray();
    }
}

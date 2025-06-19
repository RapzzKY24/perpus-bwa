<?php

namespace App\Enums;

enum MessageType : string{
    case CREATED = 'Berhasil dibuat';
    case UPDATED = 'Berhasil diperbarui';
    case DELETED = 'Berhasil dihapus';
    case ERROR = 'Terjadi Kesalahan,silahkan coba nanti';

    public function message(string $entity='', ?string $error=null):string
    {
        if($this === MessageType::ERROR && $error){
            return "{$this->value}{$error}";
        }
        return trim("{$entity} {$this->value}");
    }

}

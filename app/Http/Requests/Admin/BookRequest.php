<?php

namespace App\Http\Requests\Admin;

use App\Enums\BookLanguage;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class BookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'string',
                'required',
                'max:255',
                'min:3'
            ],
            'author' => [
                'string',
                'required',
                'max:255',
                'min:3'
            ],
            'isbn' => [
                'required',
                'string',
                'max:255'
            ],
            'language' => [
                'required',
                new Enum(BookLanguage::class)
            ],
            'synopsis' => [
                'nullable',

            ],
            'number_of_pages' => [
                'required',
                'numeric',
                'integer'
            ],
            'publication_year' => [
                'integer',
                'numeric',
                'required',
            ],
            'cover' => [
                'nullable',
                'mimes:png,jpg,jpeg,webp',
                'max:2048'
            ],
            'price' => [
                'numeric',
                'required',
                'min:0'
            ],
            'category_id' => [
                'required',
                'exists:categories,id'
            ],
            'publisher_id' => [
                'required',
                'exists:publishers,id'
            ]
        ];
    }
    public function attributes():array
    {
        return [
            'title' => 'Judul',
            'author' => 'Penulis',
            'isbn' => 'ISBN',
            'publication_year' => 'Tahun Terbit',
            'cover' => 'Cover',
            'price' => 'Harga',
            'language' => 'Bahasa',
            'synopsis' => 'Sinopsis',
            'number_of_pages' => 'Jumlah Halaman',
            'category_id' => 'Kategori',
            'publishers_id' => 'Penulis'
        ];
    }
}

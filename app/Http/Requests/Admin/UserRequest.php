<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
            'email' => [
                'email',
                'required',
                'string',

                'max:255',
                Rule::unique('users')->ignore($this->user)
            ],
            'password' => Rule::when($this->routeIs('admin.users.store'),[
                'required',
                'min:8',
                'max:255',
                'confirmed'
            ]),
            Rule::when($this->routeIs('admin.users.update'),[
                'nullable',
                'min:8',
                'max:255',
                'confirmed'
            ]),
            'name' => [
                'required',
                'string',
                'min:3',
                'max:255'
            ],
            'phone' => [
                'nullable',
                'min:10',
                'max:255'
            ],
            'avatar' => [
                'nullable',
                'mimes:jpg,jpeg,webp',
                'max:2048'
            ],
            'date_of_birth'=>[
                'nullable',
                'date'
            ],
            'address'=>[
                'nullable',
                'min:3',
                'max:255'
            ]
        ];
    }
    public function attributes():array{
        return [
            'name' => 'Nama',
            'email' => 'Email',
            'password' => 'Password',
            'phone' => 'Nomor Handphone',
            'avatar' => 'Avatar',
            'date_of_birth' => 'Tanggal Lahir',
            'address' => 'Alamat'
        ];
    }
}

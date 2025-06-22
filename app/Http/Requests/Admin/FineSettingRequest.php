<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class FineSettingRequest extends FormRequest
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
            'late_fee_per_day'=>[
                'numeric',
                'required'
            ],
            'damaged_fee_percented'=>[
                'numeric',
                'required'
            ],
           'lost_fee_percented'=>[
                'numeric',
                'required'
           ]
        ];
    }

    public function attributes():array{
        return [
            'late_fee_per_day' => 'Denda Keterlambatan',
            'damaged_fee_percented'=>"Denda Kerusakan",
            'lost_fee_percented'=>'Denda Kehilangan'
        ];
    }

}

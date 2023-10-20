<?php

namespace App\Services\Setting\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class GeneralSettingStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name'                => 'sometimes|string|max:255',
            'defaultCurrency'     => 'sometimes|string|uuid|exists:currencies,id',
            'timezone'            => 'sometimes|string|timezone',
            'dateFormat'          => 'sometimes|string',
            'companyName'         => 'sometimes|string|max:255',
            'companyVatNumber'    => 'sometimes|string|max:255',
            'companyAddress'      => 'sometimes|string|max:255',
            'companyPostCode'     => 'sometimes|string|max:255',
            'companyContactPhoneNumber'  => 'sometimes|string|max:13',
            'companyContactEmail' => 'sometimes|string|email|max:255',
            'companyWebsite'      => 'sometimes|string|max:255',
        ];
    }
}

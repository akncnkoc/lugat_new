<?php

namespace App\Services\Customer\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CustomerStoreRequest extends FormRequest
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
        if ($this->routeIs('customer.update')) {
            return [
                'name'             => 'sometimes|string|max:255',
                'surname'          => 'sometimes|string|max:255',
                'email'            => [
                    'sometimes',
                    'string',
                    'max:255',
                    'email',
                    Rule::unique('customers', 'email')
                        ->whereNull('deleted_at')
                        ->ignore($this->route('customer'), 'id')
                ],
                'phone'            => 'sometimes|string|max:13',
                'customer_type_id' => 'sometimes|uuid|exists:customer_types,id',
                'comment'          => 'sometimes|max:255',
                'city'             => 'sometimes|max:255',
                'district'         => 'sometimes|max:255',
                'neighborhood'     => 'sometimes|max:255',
                'address'          => 'sometimes|max:255',
                'post_code'        => 'sometimes|max:50',
                'gender'           => 'sometimes|bool',
            ];
        }
        return [
            'name'             => 'required|string|max:255',
            'surname'          => 'required|string|max:255',
            'email'            => 'required|string|max:255|email|unique:customers,email',
            'phone'            => 'required|string|max:13',
            'customer_type_id' => 'required|uuid|exists:customer_types,id',
            'comment'          => 'sometimes|max:255',
            'city'             => 'sometimes|max:255',
            'district'         => 'sometimes|max:255',
            'neighborhood'     => 'sometimes|max:255',
            'address'          => 'sometimes|max:255',
            'post_code'        => 'sometimes|max:50',
            'gender'           => 'sometimes|bool',
        ];
    }
}

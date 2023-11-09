<?php

namespace App\Services\Customer\Http\Requests;

use App\Services\Customer\Enums\CustomerPaymentTermType;
use App\Services\Customer\Enums\CustomerType;
use App\Services\Invoice\Traits\TaxType;
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
            'customer' => 'required',
            'customer.name'             => 'required|string|max:255',
            'customer.surname'          => 'required|string|max:255',
            'customer.email'            => 'required|string|max:255|email|unique:customers,email',
            'customer.phone'            => 'required|string|max:13',
            'customer.customer_type_id' => ['required', Rule::in(CustomerType::values())],
            'customer.comment'          => 'sometimes|max:255',
            'customer.city'             => 'sometimes|max:255',
            'customer.district'         => 'sometimes|max:255',
            'customer.neighborhood'     => 'sometimes|max:255',
            'customer.address'          => 'sometimes|max:255',
            'customer.post_code'        => 'sometimes|max:50',
            'customer.gender'           => 'sometimes|bool',
            'billing_address' => 'sometimes',
            'billing_address.attention' => 'sometimes|nullable|string|max:255',
            'billing_address.country' => 'sometimes|nullable|string',
            'billing_address.street' => 'sometimes|nullable|string',
            'billing_address.street_extended' => 'sometimes|nullable|string',
            'billing_address.city' => 'sometimes|nullable|string',
            'billing_address.state' => 'sometimes|nullable|string',
            'billing_address.zip_code' => 'sometimes|nullable|string',
            'billing_address.phone' => 'sometimes|nullable|string',
            'billing_address.fax_number' => 'sometimes|nullable|string',
            'shipping_address' => 'sometimes',
            'shipping_address.attention' => 'sometimes|nullable|string|max:255',
            'shipping_address.country' => 'sometimes|nullable|string',
            'shipping_address.street' => 'sometimes|nullable|string',
            'shipping_address.street_extended' => 'sometimes|nullable|string',
            'shipping_address.city' => 'sometimes|nullable|string',
            'shipping_address.state' => 'sometimes|nullable|string',
            'shipping_address.zip_code' => 'sometimes|nullable|string',
            'shipping_address.phone' => 'sometimes|nullable|string',
            'shipping_address.fax_number' => 'sometimes|nullable|string',
            'customer_info' => 'sometimes',
            'customer_info.tax_rate' => ['sometimes', 'nullable', Rule::in(TaxType::values())],
            'customer_info.payment_terms' => ['sometimes', 'nullable', Rule::in(CustomerPaymentTermType::values())],
            'customer_info.tax_number' => 'sometimes|nullable|max:255',
            'customer_info.tax_administration' => 'sometimes|nullable|max:255',
        ];
    }
}

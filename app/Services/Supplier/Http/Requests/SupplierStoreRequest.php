<?php

namespace App\Services\Supplier\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SupplierStoreRequest extends FormRequest
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
        if ($this->routeIs('supplier.update')) {
            return [
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|max:255',
                'phone' => 'sometimes|string|max:255'
            ];
        }
        return [
            'name' => 'required|string|max:255',
            'email' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:255'
        ];
    }
}

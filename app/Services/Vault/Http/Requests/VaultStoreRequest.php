<?php

namespace App\Services\Vault\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class VaultStoreRequest extends FormRequest
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
        if ($this->routeIs('vault.store')) {
            return [
                'name'        => 'required|string|max:255',
                'currency_id' => 'required|uuid|exists:currencies,id'
            ];
        } else {
            return [
                'name'        => 'sometimes|string|max:255',
                'currency_id' => 'sometimes|uuid|exists:currencies,id'
            ];
        }
    }
}

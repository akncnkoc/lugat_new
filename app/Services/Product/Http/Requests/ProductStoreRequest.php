<?php

namespace App\Services\Product\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ProductStoreRequest extends FormRequest
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
        if ($this->routeIs('product.update')) {
            return [
                'name'                 => 'sometimes|string|max:255',
                'model_code'           => 'sometimes|string|max:255',
                'buy_price'            => 'sometimes|numeric',
                'sell_price'           => 'sometimes|numeric',
                'buy_price_vault_id'   => 'sometimes|uuid|exists:vaults,id',
                'sell_price_vault_id'  => 'sometimes|uuid|exists:vaults,id',
                'critical_stock_alert' => 'sometimes|boolean'
            ];
        }
        return [
            'name'                 => 'required|string|max:255',
            'model_code'           => 'sometimes|string|max:255',
            'buy_price'            => 'sometimes|numeric',
            'sell_price'           => 'required|numeric',
            'buy_price_vault_id'   => 'sometimes|uuid|exists:vaults,id',
            'sell_price_vault_id'  => 'required|uuid|exists:vaults,id',
            'critical_stock_alert' => 'sometimes|boolean',
            'images'               => 'sometimes|array',
            'images.*'             => 'image|max:4096'
        ];
    }
}

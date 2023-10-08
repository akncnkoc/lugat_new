<?php

namespace App\Services\Product\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SubProductStoreRequest extends FormRequest
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
        if ($this->routeIs('sub-product.update-sub-products')) {
            return [
                'sub_products'                    => 'required|array|min:1',
                'sub_products.*.id'               => 'required|uuid|exists:sub_products,id',
                'sub_products.*.name'             => 'required|string|max:255',
                'sub_products.*.sku'              => 'sometimes|nullable|max:255',
                'sub_products.*.barcode'          => 'sometimes|nullable|max:255',
                'sub_products.*.buy_price'        => 'required|numeric',
                'sub_products.*.sell_price'       => 'required|numeric',
                'sub_products.*.buy_currency_id'  => 'required|uuid|exists:currencies,id',
                'sub_products.*.sell_currency_id' => 'required|uuid|exists:currencies,id',
                'sub_products.*.stock'            => 'required|numeric',
                'sub_products.*.tax'              => 'required|in:0,1,10,20',
                'sub_products.*.variants'         => 'sometimes|array',
                'sub_products.*.variants.*'       => 'required',
                'sub_products.*.images'           => 'sometimes',
                'sub_products.*.images.*'         => 'image|size:4096',
            ];
        }
        return [
            'sub_products'                    => 'required|array|min:1',
            'sub_products.*.name'             => 'required|string|max:255',
            'sub_products.*.sku'              => 'sometimes|nullable|max:255',
            'sub_products.*.barcode'          => 'sometimes|nullable|max:255',
            'sub_products.*.buy_price'        => 'required|numeric',
            'sub_products.*.sell_price'       => 'required|numeric',
            'sub_products.*.buy_currency_id'  => 'required|uuid|exists:currencies,id',
            'sub_products.*.sell_currency_id' => 'required|uuid|exists:currencies,id',
            'sub_products.*.stock'            => 'required|numeric',
            'sub_products.*.tax'              => 'required|in:0,1,10,20',
            'sub_products.*.variants'         => 'sometimes',
            'sub_products.*.variants.*'       => 'required|uuid|exists:variants,id',
            'sub_products.*.images'           => 'sometimes',
            'sub_products.*.images.*'         => 'image|size:4096',
        ];
    }
}

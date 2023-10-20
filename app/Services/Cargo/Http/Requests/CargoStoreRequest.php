<?php

namespace App\Services\Cargo\Http\Requests;

use App\Services\Cargo\Enums\AmountType;
use App\Services\Cargo\Enums\CargoType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CargoStoreRequest extends FormRequest
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
            'cargo_company_id' => 'required|exists:cargo_companies,id',
            'type' => ['required', Rule::in(CargoType::values())],
            'tracking_no' => 'sometimes|max:255',
            'amount_type' => ['required', Rule::in(AmountType::values())],
            'price' => 'required|numeric|min:0',
            'price_currency_id' => 'required|uuid|exists:currencies,id',
            'date_of_paid' => 'sometimes|date'
        ];
    }
}

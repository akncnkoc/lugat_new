<?php

namespace App\Services\Expense\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ExpenseStoreRequest extends FormRequest
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
        if ($this->routeIs('expense.update')) {
            return [
                'amount' => 'sometimes|numeric',
                'receipt_date' => 'sometimes|date_format:d.m.Y H:i:s',
                'vault_id' => 'sometimes|uuid|exists:vaults,id',
                'comment' => 'sometimes|max:255',
                'expense_type_id' => 'sometimes|uuid|exists:expense_types,id',
            ];
        }
        return [
            'amount' => 'required|numeric',
            'receipt_date' => 'required|date_format:d.m.Y H:i:s',
            'vault_id' => 'required|uuid|exists:vaults,id',
            'expense_type_id' => 'required|uuid|exists:expense_types,id',
            'comment' => 'sometimes|max:255',
        ];
    }
}

<?php

namespace App\Services\Expense\Http\Requests;

use App\Services\Expense\Enums\ExpenseStatus;
use App\Services\Expense\Enums\ExpenseType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

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
                'receipt_date' => 'required_if:status,paided|nullable|date',
                'scheduled_date' => 'required_if:status,scheduled|nullable|date',
                'currency_id' => 'sometimes|uuid|exists:currencies,id',
                'type' => ['sometimes', Rule::in(ExpenseType::values())],
                'status' => ['sometimes', Rule::in(ExpenseStatus::values())],
            ];
        }
        return [
            'amount' => 'required|numeric',
            'status' => ['required', Rule::in(ExpenseStatus::values())],
            'receipt_date' => 'required_if:status,==,paided|nullable|date',
            'scheduled_date' => 'required_if:status,==,scheduled|nullable|date',
            'currency_id' => 'required|uuid|exists:currencies,id',
            'type' => ['required', Rule::in(ExpenseType::values())],
            'comment' => 'sometimes|max:255',
        ];
    }
}

<?php

namespace App\Services\Staff\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StaffStoreRequest extends FormRequest
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
        if ($this->routeIs('staff.update')) {
            return [
                'name'            => 'sometimes|string|max:255',
                'surname'         => 'sometimes|string|max:255',
                'phone'           => 'sometimes|string|max:13',
                'type'            => 'sometimes|in:full_time,part_time,temporary,seasonal',
                'email'           => 'sometimes|email|max:255',
                'salary'          => 'sometimes|numeric',
                'salary_vault_id' => 'sometimes|exists:vaults,id,deleted_at,NULL'
            ];
        }
        return [
            'name'            => 'required|string|max:255',
            'surname'         => 'sometimes|string|max:255',
            'type'            => 'required|in:full_time,part_time,temporary,seasonal',
            'phone'           => 'sometimes|string|max:13',
            'email'           => 'sometimes|email|max:255',
            'salary'          => 'sometimes|numeric',
            'salary_vault_id' => 'sometimes|exists:vaults,id,deleted_at,NULL'
        ];
    }
}

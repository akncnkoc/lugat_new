<?php

namespace App\Services\User\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserStoreRequest extends FormRequest
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        if ($this->routeIs('user.store')) {
            return [
                'name'         => 'required|string|max:255',
                'surname'      => 'required|string|max:255',
                'email'        => 'required|string|email|max:255|unique:users,email',
                'phone'        => 'required|string|max:13',
                'username'     => 'required|string|max:16',
                'password'     => 'required|confirmed',
                'user_role_id' => 'required|uuid|exists:user_roles,id'
            ];
        } else {
            return [
                'name'     => 'sometimes|string|max:255',
                'surname'  => 'sometimes|string|max:255',
                'email'    => 'sometimes|string|email|max:255|unique:users,email',
                'phone'    => 'sometimes|string|max:13',
                'username' => 'sometimes|string|max:16',
                'password' => 'sometimes|confirmed'
            ];
        }
    }
}

<?php

namespace App\Services\User\Database\Factories;

use App\Services\User\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\User\Models\User>
 */
class UserFactory extends Factory
{

    protected $model = User::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'surname' => $this->faker->lastName,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'password' => Hash::make('password'),
            'username' => $this->faker->userName,
        ];
    }
}

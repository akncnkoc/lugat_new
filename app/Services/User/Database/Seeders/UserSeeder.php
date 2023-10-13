<?php

namespace App\Services\User\Database\Seeders;

use App\Services\User\Models\Permission;
use App\Services\User\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::factory(1)
                     ->state(new Sequence(
                         [
                             'email'   => 'test@test.com',
                             'password' => Hash::make('incrediblySecurePassword')
                         ]
                     ))->create();
        $users->each(function (User $user) {
            $user->givePermissionTo(Permission::where('guard_name', 'web')->get());
        });
    }
}

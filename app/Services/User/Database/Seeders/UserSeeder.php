<?php

namespace App\Services\User\Database\Seeders;

use App\Services\User\Models\Permission;
use App\Services\User\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::factory(10)->create();
        $users->each(function (User $user) {
            $user->givePermissionTo(Permission::where('guard_name', 'web')->get());
        });
    }
}

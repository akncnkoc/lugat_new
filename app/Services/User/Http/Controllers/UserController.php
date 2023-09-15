<?php

namespace App\Services\User\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\User\Http\Requests\UserStoreRequest;
use App\Services\User\Http\Resources\UserResource;
use App\Services\User\Models\User;
use App\Services\User\Models\UserRole;
use App\Traits\ResponseTrait;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use ResponseTrait;

    public function store(UserStoreRequest $request)
    {
        try {
            DB::beginTransaction();
            $request->merge(['password' => Hash::make($request->get('password'))]);
            $user = User::create($request->safe()->all());

            UserRole::create([
                'user_id' => $user->id,
                'role_id' => $request->get('user_role_id')
            ]);

//      foreach ($request->get('permissions') as $permissionKey => $permissionValue) {
//        $user->givePermissionsTo($permissionValue);
//      }
            DB::commit();
            return $this->created("User created");
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error("internal error", data: $e->getMessage());
        }
    }

    public function show(User $user)
    {
        return $this->success("user showed", data: new UserResource($user));
    }

    public function update(UserStoreRequest $request, User $user)
    {
        try {
            if ($request->has('password')) {
                $request->merge([
                    'password' => Hash::make($request->get('password'))
                ]);
            }

            DB::beginTransaction();
            $user->update($request->safe()->all());
            DB::commit();
            //TODO: move to another new route
//            $user_role = UserRole::where('user_id', $user->id)->first();
//            $user_role->update(['role_id' => $request->get('user_role_id')]);

//            $user->permissions()->detach();
//
//            foreach ($request->get('permissions') as $permissionKey => $permissionValue) {
//                $user->givePermissionsTo($permissionValue);
//            }
            return $this->success("user updated");
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error("internal error");
        }
    }

    public function destroy(User $user)
    {
        try {
            DB::beginTransaction();
            $user->delete();
            DB::commit();
            return $this->success("user removed");
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error("internal error");
        }
    }
}

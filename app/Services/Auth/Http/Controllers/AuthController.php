<?php

namespace App\Services\Auth\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Services\Auth\Enums\UserTokenAbility;
use App\Services\Auth\Http\Requests\ForgotPasswordRequest;
use App\Services\Auth\Http\Requests\LoginRequest;
use App\Services\Auth\Http\Requests\ResetPasswordRequest;
use App\Services\User\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    /**
     * @param  LoginRequest  $request
     * @return JsonResponse
     */
    public function authenticate(LoginRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            if (!auth()->validate($request->all())) {
                return $this->badRequest("bad credentials");
            }
            $user = User::firstWhere("email", $request->get('email'));
            $user->tokens()->delete();
            $token = $user->createToken('access_token', [UserTokenAbility::ACCESS_API->value], Carbon::now()->addMinutes(config('sanctum.expiration')))->plainTextToken;
            $refresh_token = $user->createToken('refresh_token', [UserTokenAbility::ISSUE_ACCESS_TOKEN->value], Carbon::now()->addMinutes(config('sanctum.rt_expiration')))->plainTextToken;
            DB::commit();
            return $this->success("logged in", statusCode: Response::HTTP_CREATED, data: [
                "token"         => $token,
                "refresh_token" => $refresh_token
            ]);
        } catch (Exception) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    public function refreshToken(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $request->user()->tokens()->delete();
            $token = $request->user()->createToken('access_token', [UserTokenAbility::ACCESS_API->value], Carbon::now()->addMinutes(config('sanctum.expiration')))->plainTextToken;
            $refresh_token = $request->user()->createToken('refresh_token', [UserTokenAbility::ISSUE_ACCESS_TOKEN->value], Carbon::now()->addMinutes(config('sanctum.rt_expiration')))->plainTextToken;
            DB::commit();
            return $this->success("user token refreshed", statusCode: Response::HTTP_CREATED, data: [
                "token"         => $token,
                "refresh_token" => $refresh_token
            ]);
        } catch (Exception) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    /**
     * @return JsonResponse
     */
    public function logout()
    {
        try {
            DB::beginTransaction();
            Auth::user()->tokens()->delete();
            DB::commit();
            return $this->success("logged out");
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    /**
     * @param  ForgotPasswordRequest  $request
     * @return JsonResponse
     */
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        try {
            DB::beginTransaction();
            $status = Password::sendResetLink($request->safe()->only('email'));
            if ($status !== Password::RESET_LINK_SENT) {
                throw new Exception("password reset link cannot sent");
            }
            DB::commit();
            return $this->success('password reset link sent');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    /**
     * @param  ResetPasswordRequest  $request
     * @return JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        try {
            DB::beginTransaction();
            $user = User::firstWhere('email', $request->get('email'));
            $user->update([
                'password_token' => '',
                'password'       => Hash::make($request->get('password')),
                'remember_token' => Str::random(60)
            ]);
            DB::commit();
            return $this->success('password reset is success');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('password cannot be reset');
        }
    }
}

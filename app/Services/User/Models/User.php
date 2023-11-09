<?php

namespace App\Services\User\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Services\User\Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasUuids, Notifiable, SoftDeletes, HasRoles, HasPermissions;

    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone',
        'username',
        'email',
        'email_verified_at',
        'password'
    ];

    protected $hidden = ['password', 'remember_token',];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed'
    ];

    protected static function newFactory(): UserFactory
    {
        return UserFactory::new();
    }

    protected function fullName(): Attribute
    {
        return Attribute::make(get: fn(
            $value,
            $attributes
        ) => $attributes['name'] . ' ' . $attributes['surname']);
    }
}

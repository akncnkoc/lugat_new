<?php

namespace App\Services\User\Models;

use App\Services\User\Database\Factories\UserRoleFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [];


    protected static function newFactory(): UserRoleFactory
    {
        return UserRoleFactory::new();
    }
}

<?php

namespace App\Services\Customer\Models;

use App\Services\Customer\Database\Factories\CustomerRoleFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerRole extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $guarded = [];
    protected static function newFactory(): CustomerRoleFactory
    {
        return CustomerRoleFactory::new();
    }
}

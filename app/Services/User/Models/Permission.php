<?php

declare(strict_types=1);
namespace App\Services\User\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission as SpatieRole;

class Permission extends SpatieRole
{
    use HasUuids;

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            do $id = Str::uuid();
            while (!is_null(self::find($id)));
            $model->id = $id;
        });
    }
}

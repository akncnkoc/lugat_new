<?php

declare(strict_types=1);

namespace App\Services\User\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasUuids;

    public static function boot(): void
    {
        parent::boot();
        static::creating(function ($model) {
            do {
                $id = Str::uuid();
            } while (Role::find($id));
            $model->id = $id;
        });
    }
}

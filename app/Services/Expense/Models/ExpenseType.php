<?php

namespace App\Services\Expense\Models;

use App\Services\Expense\Database\Factories\ExpenseTypeFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExpenseType extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $guarded = [];

    protected static function newFactory(): ExpenseTypeFactory
    {
        return ExpenseTypeFactory::new();
    }
}

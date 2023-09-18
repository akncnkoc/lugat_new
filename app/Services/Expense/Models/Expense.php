<?php

namespace App\Services\Expense\Models;

use App\Services\Expense\Database\Factories\ExpenseFactory;
use App\Services\Expense\Enums\ExpenseType;
use App\Services\Vault\Models\Vault;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Expense extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'expenses';
    protected $guarded = [];

    protected $casts = [
        'type' => ExpenseType::class
    ];

    protected static function newFactory(): ExpenseFactory
    {
        return ExpenseFactory::new();
    }

    public function vault(): BelongsTo
    {
        return $this->belongsTo(Vault::class, 'vault_id', 'id');
    }
}

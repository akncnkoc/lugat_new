<?php

namespace App\Services\Expense\Models;

use App\Services\Currency\Models\Currency;
use App\Services\Expense\Database\Factories\ExpenseFactory;
use App\Services\Expense\Enums\ExpenseStatus;
use App\Services\Expense\Enums\ExpenseType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Expense extends Model
{
    use HasFactory, HasUuids, SoftDeletes, LogsActivity;

    protected $table = 'expenses';
    protected $guarded = [];

    protected $casts = [
        'type' => ExpenseType::class,
        'status' => ExpenseStatus::class
    ];

    protected static function newFactory(): ExpenseFactory
    {
        return ExpenseFactory::new();
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id', 'id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->setDescriptionForEvent(fn(string $eventName) => "This model has been $eventName")
            ->dontSubmitEmptyLogs();
    }
}

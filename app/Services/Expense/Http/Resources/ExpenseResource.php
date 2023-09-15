<?php

namespace App\Services\Expense\Http\Resources;

use App\Services\Expense\Models\Expense;
use App\Services\Vault\Http\Resources\VaultResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Expense
 */
class ExpenseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'vault' => VaultResource::make($this->vault),
            'comment' => $this->comment,
            'receipt_date' => $this->receipt_date,
            'expense_type' => ExpenseTypeResource::make($this->expenseType)
        ];
    }
}

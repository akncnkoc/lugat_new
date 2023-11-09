<?php

namespace App\Services\Expense\Http\Resources;

use App\Services\Currency\Http\Resources\CurrencyResource;
use App\Services\Expense\Models\Expense;
use Carbon\Carbon;
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
            'currency' => CurrencyResource::make($this->currency),
            'comment' => $this->comment,
            'receipt_date' => $this->whenNotNull(Carbon::make($this->receipt_date)),
            'type' => $this->type,
            'status' => $this->status,
            'scheduled_date' => $this->whenNotNull(Carbon::make($this->scheduled_date))
        ];
    }
}

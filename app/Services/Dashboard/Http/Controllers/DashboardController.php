<?php

namespace App\Services\Dashboard\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Services\Customer\Models\Customer;
use App\Services\Expense\Models\Expense;
use App\Services\Invoice\Models\Invoice;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $customersCount = Customer::count();
        $invoicesCount = Invoice::count();
        $expenseQuery = Expense::select([DB::raw("sum(amount)"), DB::raw("currencies.name")])
                        ->groupBy('currency_id', 'currencies.name')
                        ->join('currencies', 'expenses.currency_id', '=', 'currencies.id')
                        ->get();
        dd(json_decode($expenseQuery));
        return $this->success('a', data: Expense::groupBy('currency_id', 'id')->get());
    }
}

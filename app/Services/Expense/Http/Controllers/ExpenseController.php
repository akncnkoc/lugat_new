<?php

namespace App\Services\Expense\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Services\Expense\Http\Requests\ExpenseStoreRequest;
use App\Services\Expense\Http\Resources\ExpenseResource;
use App\Services\Expense\Models\Expense;
use App\Traits\ResponseTrait;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ExpenseController extends Controller
{
    use ResponseTrait;

    public function index()
    {
        $this->authorize('expenseView', Expense::class);
        return ExpenseResource::collection(Expense::paginate());
    }


    public function search(SearchRequest $request)
    {
        $this->authorize('expenseView', Expense::class);
        $expenseQuery = Expense::query();
        $expenseQuery->whereRaw($request->get('expression'), $request->get('bindings'));
        $expenseQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'desc');
        return ExpenseResource::collection($expenseQuery->paginate());
    }

    public function store(ExpenseStoreRequest $request)
    {
        $this->authorize('expenseStore', Expense::class);
        try {
            DB::beginTransaction();
            Expense::create($request->safe()->all());
            DB::commit();
            return $this->success('expense created', statusCode: Response::HTTP_CREATED);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    public function show(Expense $expense)
    {
        $this->authorize('expenseView', Expense::class);
        return ExpenseResource::make($expense);
    }

    public function update(Expense $expense, ExpenseStoreRequest $request)
    {
        $this->authorize('expenseUpdate', Expense::class);
        try {
            DB::beginTransaction();
            $expense->update($request->safe()->all());
            DB::commit();
            return $this->success('expense updated');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    public function destroy(Expense $expense)
    {
        $this->authorize('expenseDelete', Expense::class);
        try {
            DB::beginTransaction();
            $expense->delete();
            DB::commit();
            return $this->success('expense deleted');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

}

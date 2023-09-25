<?php

namespace App\Services\Expense\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Global\Http\Requests\SearchRequest;
use App\Global\Traits\ResponseTrait;
use App\Services\Expense\Http\Requests\ExpenseStoreRequest;
use App\Services\Expense\Http\Resources\ExpenseResource;
use App\Services\Expense\Models\Expense;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ExpenseController extends Controller
{
    use ResponseTrait;

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('expenseView', Expense::class);
        return ExpenseResource::collection(Expense::paginate());
    }


    public function search(SearchRequest $request): AnonymousResourceCollection
    {
        $this->authorize('expenseView', Expense::class);
        $expenseQuery = Expense::query();
        $expenseQuery->whereRaw($request->get('expression'), $request->get('bindings'));
        $expenseQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'desc');
        return ExpenseResource::collection($expenseQuery->paginate());
    }

    public function store(ExpenseStoreRequest $request): ?JsonResponse
    {
        $this->authorize('expenseStore', Expense::class);
        sleep(2);
        DB::transaction(static function () use ($request) {
            Expense::create($request->safe()->all());
        });
        return $this->success('expense created', statusCode: Response::HTTP_CREATED);
    }

    public function show(Expense $expense): ExpenseResource
    {
        $this->authorize('expenseView', Expense::class);
        return ExpenseResource::make($expense);
    }

    public function update(Expense $expense, ExpenseStoreRequest $request): ?JsonResponse
    {
        $this->authorize('expenseUpdate', Expense::class);
        DB::transaction(static function () use ($expense, $request) {
            $expense->update($request->safe()->all());
        });
        return $this->success('expense updated');
    }

    public function destroy(Expense $expense): ?JsonResponse
    {
        $this->authorize('expenseDelete', Expense::class);
        DB::transaction(static function () use ($expense) {
            $expense->delete();
        });
        return $this->success('expense deleted');
    }

}

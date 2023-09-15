<?php

namespace App\Services\Expense\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Global\Http\Requests\SearchRequest;
use App\Global\Traits\ResponseTrait;
use App\Services\Expense\Http\Requests\ExpenseTypeStoreRequest;
use App\Services\Expense\Http\Resources\ExpenseTypeResource;
use App\Services\Expense\Models\ExpenseType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ExpenseTypeController extends Controller
{
    use ResponseTrait;

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('expenseTypeView', ExpenseType::class);
        return ExpenseTypeResource::collection(ExpenseType::paginate());
    }


    public function search(SearchRequest $request): AnonymousResourceCollection
    {
        $this->authorize('expenseTypeView', ExpenseType::class);
        $expenseTypeQuery = ExpenseType::query();
        $expenseTypeQuery->whereRaw($request->get('expression'), $request->get('bindings'));
        $expenseTypeQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'desc');
        return ExpenseTypeResource::collection($expenseTypeQuery->paginate());
    }

    public function store(ExpenseTypeStoreRequest $request): ?JsonResponse
    {
        $this->authorize('expenseTypeStore', ExpenseType::class);
        DB::transaction(static function () use ($request) {
            ExpenseType::create($request->safe()->all());
        });
        return $this->success('expense type created', statusCode: Response::HTTP_CREATED);
    }

    public function show(ExpenseType $expenseType): ExpenseTypeResource
    {
        $this->authorize('expenseTypeView', ExpenseType::class);
        return ExpenseTypeResource::make($expenseType);
    }

    public function update(ExpenseType $expenseType, ExpenseTypeStoreRequest $request): ?JsonResponse
    {
        $this->authorize('expenseTypeUpdate', ExpenseType::class);
        DB::transaction(static function () use ($expenseType, $request) {
            $expenseType->update($request->safe()->all());
        });
        return $this->success('expense type updated');
    }

    public function destroy(ExpenseType $expenseType): ?JsonResponse
    {
        $this->authorize('expenseTypeDelete', ExpenseType::class);
        DB::transaction(static function () use ($expenseType) {
            $expenseType->delete();
        });
        return $this->success('expense type deleted');
    }
}

<?php

namespace App\Services\Customer\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Global\Http\Requests\SearchRequest;
use App\Global\Traits\ResponseTrait;
use App\Services\Customer\Http\Requests\CustomerTypeStoreRequest;
use App\Services\Customer\Http\Resources\CustomerTypeResource;
use App\Services\Customer\Models\CustomerType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

;

class CustomerTypeController extends Controller
{
    use ResponseTrait;

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('customerTypeView', CustomerType::class);
        return CustomerTypeResource::collection(CustomerType::paginate());
    }

    public function search(SearchRequest $request): AnonymousResourceCollection
    {
        $this->authorize('customerTypeView', CustomerType::class);
        $customerTypeQuery = CustomerType::query();
        $customerTypeQuery->rawValue($request->get('expression'), $request->get('bindings'));
        $customerTypeQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'ASC');
        return CustomerTypeResource::collection($customerTypeQuery->paginate());
    }

    public function store(CustomerTypeStoreRequest $request): ?JsonResponse
    {
        $this->authorize('customerTypeStore', CustomerType::class);
        DB::transaction(static function () use ($request) {
            CustomerType::create($request->safe()->all());
        });
        return $this->success('customer type created', statusCode: Response::HTTP_CREATED);
    }

    public function show(CustomerType $customerType): CustomerTypeResource
    {
        $this->authorize('customerTypeView', CustomerType::class);
        return CustomerTypeResource::make($customerType);
    }

    public function update(CustomerType $customerType, CustomerTypeStoreRequest $request): ?JsonResponse
    {
        $this->authorize('customerTypeUpdate', CustomerType::class);
        DB::transaction(static function () use ($customerType, $request) {
            $customerType->update($request->safe()->all());
        });
        return $this->success('customer type updated');
    }

    public function destroy(CustomerType $customerType): ?JsonResponse
    {
        $this->authorize('customerTypeDelete', CustomerType::class);
        DB::transaction(static function () use ($customerType) {
            $customerType->delete();
        });
        return $this->success('customer type deleted');
    }
}

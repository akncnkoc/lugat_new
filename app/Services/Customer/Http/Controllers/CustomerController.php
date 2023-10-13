<?php

namespace App\Services\Customer\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Global\Http\Requests\SearchRequest;
use App\Services\Customer\Http\Requests\CustomerStoreRequest;
use App\Services\Customer\Http\Resources\CustomerResource;
use App\Services\Customer\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CustomerController extends Controller
{

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('customerView', Customer::class);
        return CustomerResource::collection(Customer::paginate());
    }


    public function search(SearchRequest $request): AnonymousResourceCollection
    {
        $this->authorize('customerView', Customer::class);
        $customerQuery = Customer::query();
        $customerQuery->whereRaw($request->get('expression'), $request->get('bindings'));
        $customerQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'desc');
        return CustomerResource::collection($customerQuery->paginate());
    }

    public function store(CustomerStoreRequest $request): ?JsonResponse
    {
        $this->authorize('customerStore', Customer::class);
        DB::transaction(static function () use ($request) {
            Customer::create($request->safe()->all());
        });
        return $this->success('customer created', statusCode: Response::HTTP_CREATED);
    }

    public function show(Customer $customer): CustomerResource
    {
        $this->authorize('customerView', Customer::class);
        return CustomerResource::make($customer);
    }

    public function update(Customer $customer, CustomerStoreRequest $request): ?JsonResponse
    {
        $this->authorize('customerUpdate', Customer::class);
        DB::transaction(static function () use ($request, $customer) {

            $customer->update($request->safe()->all());
        });
        return $this->success('customer updated');
    }

    public function destroy(Customer $customer): ?JsonResponse
    {
        $this->authorize('customerDelete', Customer::class);
        DB::transaction(static function () use ($customer) {
            $customer->delete();
        });
        return $this->success('customer deleted');
    }

}

<?php

namespace App\Services\Customer\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Services\Customer\Http\Requests\CustomerSearchRequest;
use App\Services\Customer\Http\Requests\CustomerStoreRequest;
use App\Services\Customer\Http\Resources\CustomerResource;
use App\Services\Customer\Models\Customer;
use App\Traits\ResponseTrait;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CustomerController extends Controller
{
    use ResponseTrait;

    public function index()
    {
        $this->authorize('customerView', Customer::class);
        return CustomerResource::collection(Customer::paginate());
    }


    public function search(SearchRequest $request)
    {
        $this->authorize('customerView', Customer::class);
        $customerQuery = Customer::query();
        $customerQuery->whereRaw($request->get('expression'), $request->get('bindings'));
        $customerQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'desc');
        return CustomerResource::collection($customerQuery->paginate());
    }

    public function store(CustomerStoreRequest $request)
    {
        $this->authorize('customerStore', Customer::class);
        try {
            DB::beginTransaction();
            Customer::create($request->safe()->all());
            DB::commit();
            return $this->success('customer created', statusCode: Response::HTTP_CREATED);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    public function show(Customer $customer)
    {
        $this->authorize('customerView', Customer::class);
        return CustomerResource::make($customer);
    }

    public function update(Customer $customer, CustomerStoreRequest $request)
    {
        $this->authorize('customerUpdate', Customer::class);
        try {
            DB::beginTransaction();
            $customer->update($request->safe()->all());
            DB::commit();
            return $this->success('customer updated');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    public function destroy(Customer $customer)
    {
        $this->authorize('customerDelete', Customer::class);
        try {
            DB::beginTransaction();
            $customer->delete();
            DB::commit();
            return $this->success('customer deleted');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

}

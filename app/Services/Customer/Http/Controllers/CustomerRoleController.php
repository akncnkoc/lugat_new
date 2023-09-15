<?php

namespace App\Services\Customer\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Services\Customer\Http\Requests\CustomerRoleStoreRequest;
use App\Services\Customer\Http\Requests\CustomerSearchRequest;
use App\Services\Customer\Http\Resources\CustomerRoleResource;
use App\Services\Customer\Models\CustomerRole;
use App\Traits\ResponseTrait;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CustomerRoleController extends Controller
{
    use ResponseTrait;

    public function index()
    {
        $this->authorize('customerRoleView', CustomerRole::class);
        return CustomerRoleResource::collection(CustomerRole::paginate());
    }

    public function search(SearchRequest $request)
    {
        $this->authorize('customerRoleView', CustomerRole::class);
        $customerRoleQuery = CustomerRole::query();
        $customerRoleQuery->rawValue($request->get('expression'), $request->get('bindings'));
        $customerRoleQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'ASC');
        return CustomerRoleResource::collection($customerRoleQuery->paginate());
    }

    public function store(CustomerRoleStoreRequest $request)
    {
        $this->authorize('customerRoleStore', CustomerRole::class);
        try {
            DB::beginTransaction();
            CustomerRole::create($request->safe()->all());
            DB::commit();
            return $this->success('customer role created', statusCode: Response::HTTP_CREATED);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    public function show(CustomerRole $customerRole)
    {
        $this->authorize('customerRoleView', CustomerRole::class);
        return CustomerRoleResource::make($customerRole);
    }

    public function update(CustomerRole $customerRole, CustomerRoleStoreRequest $request)
    {
        $this->authorize('customerRoleUpdate', CustomerRole::class);
        try {
            DB::beginTransaction();
            $customerRole->update($request->safe()->all());
            DB::commit();
            return $this->success('customer role updated');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    public function destroy(CustomerRole $customerRole)
    {
        $this->authorize('customerRoleDelete', CustomerRole::class);
        try {
            DB::beginTransaction();
            $customerRole->delete();
            DB::commit();
            return $this->success('customer role deleted');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }
}

<?php

namespace App\Services\Supplier\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Global\Http\Requests\SearchRequest;
use App\Global\Traits\ResponseTrait;
use App\Services\Supplier\Http\Requests\SupplierStoreRequest;
use App\Services\Supplier\Http\Resources\SupplierResource;
use App\Services\Supplier\Models\Supplier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class SupplierController extends Controller
{
    use ResponseTrait;

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('supplierView', Supplier::class);
        return SupplierResource::collection(Supplier::paginate());
    }


    public function search(SearchRequest $request): AnonymousResourceCollection
    {
        $this->authorize('supplierView', Supplier::class);
        $supplierQuery = Supplier::query();
        $supplierQuery->whereRaw($request->get('expression'), $request->get('bindings'));
        $supplierQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'desc');
        return SupplierResource::collection($supplierQuery->paginate());
    }

    public function store(SupplierStoreRequest $request): ?JsonResponse
    {
        $this->authorize('supplierStore', Supplier::class);
        DB::transaction(static function () use ($request) {
            Supplier::create($request->safe()->all());
        });
        return $this->success('supplier created', statusCode: Response::HTTP_CREATED);
    }

    public function show(Supplier $supplier): SupplierResource
    {
        $this->authorize('supplierView', Supplier::class);
        return SupplierResource::make($supplier);
    }

    public function update(Supplier $supplier, SupplierStoreRequest $request): ?JsonResponse
    {
        $this->authorize('supplierUpdate', Supplier::class);
        DB::transaction(static function () use ($supplier, $request) {
            $supplier->update($request->safe()->all());
        });
        return $this->success('supplier updated');
    }

    public function destroy(Supplier $supplier): ?JsonResponse
    {
        $this->authorize('supplierDelete', Supplier::class);
        DB::transaction(static function () use ($supplier) {
            $supplier->delete();
        });
        return $this->success('supplier deleted');
    }

}

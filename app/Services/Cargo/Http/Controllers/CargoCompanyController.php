<?php

namespace App\Services\Cargo\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Global\Http\Requests\SearchRequest;
use App\Services\Cargo\Http\Requests\CargoCompanyStoreRequest;
use App\Services\Cargo\Http\Resources\CargoCompanyResource;
use App\Services\Cargo\Models\CargoCompany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class CargoCompanyController extends Controller
{
    public function index(SearchRequest $request): AnonymousResourceCollection
    {
        $this->authorize('cargoCompanyView', CargoCompany::class);
        $cargoCompany = CargoCompany::query();
        if ($search = request()?->query('search')) {
            $cargoCompany->where('name', 'ILIKE', "%$search%");
        }
        if ($request->has('expression')) {
            $cargoCompany->whereRaw($request->get('expression'), $request->get('bindings'));
        }
        if ($request->has('orderByColumn') && $request->has('orderByColumnDirection')) {
            $orderByColumn = $request->get('orderByColumn');
            $orderByColumnDirection = $request->get('orderByColumnDirection');
            $cargoCompany->orderBy($orderByColumn, $orderByColumnDirection);
        }
        return CargoCompanyResource::collection($cargoCompany->paginate());
    }

    public function show(CargoCompany $cargoCompany): CargoCompanyResource
    {
        $this->authorize('cargoCompanyView', CargoCompany::class);
        return CargoCompanyResource::make($cargoCompany);
    }

    public function store(CargoCompanyStoreRequest $request): ?JsonResponse
    {
        $this->authorize('cargoCompanyStore', CargoCompany::class);
        DB::transaction(function () use ($request) {
            CargoCompany::create($request->safe()->all());
        });

        return $this->created('cargo company stored');
    }

    public function update(CargoCompanyStoreRequest $request, CargoCompany $cargoCompany): ?JsonResponse
    {
        $this->authorize('cargoCompanyUpdate', CargoCompany::class);
        DB::transaction(function () use ($request, $cargoCompany) {
            $cargoCompany->update($request->safe()->all());
        });

        return $this->success('cargo company stored');
    }

    public function destroy(CargoCompany $cargoCompany): JsonResponse
    {
        $this->authorize('cargoCompanyDelete', CargoCompany::class);
        DB::transaction(function () use ($cargoCompany) {
            $cargoCompany->delete();
        });
        return $this->success('cargo company deleted');
    }
}

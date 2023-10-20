<?php

namespace App\Services\Cargo\Http\Controllers;


use App\Global\Http\Controllers\Controller;
use App\Global\Traits\ResponseTrait;
use App\Services\Cargo\Http\Requests\CargoStoreRequest;
use App\Services\Cargo\Http\Resources\CargoResource;
use App\Services\Cargo\Models\Cargo;
use Illuminate\Support\Facades\DB;

class CargoController extends Controller
{
    use ResponseTrait;

    public function index()
    {
        $this->authorize('cargoView', Cargo::class);
        return CargoResource::collection(Cargo::with('cargoCompany', 'priceCurrency')->paginate());
    }

    public function store(CargoStoreRequest $request)
    {
        $this->authorize('cargoStore', Cargo::class);
        DB::transaction(function () use ($request) {
            Cargo::create($request->safe()->all());
        });
        return $this->created('cargo stored');
    }

    public function show(Cargo $cargo)
    {
        $this->authorize('cargoView', Cargo::class);
        return CargoResource::make($cargo);
    }

    public function update(CargoStoreRequest $request, Cargo $cargo)
    {
        $this->authorize('cargoUpdate', Cargo::class);
        DB::transaction(function () use ($request, $cargo) {
            $cargo->update($request->safe()->all());
        });
        return $this->success('cargo stored');
    }
    public function destroy(Cargo $cargo)
    {
        $this->authorize('cargoDelete', Cargo::class);
        DB::transaction(function () use ($cargo) {
            $cargo->delete();
        });
        return $this->success('cargo stored');
    }
}

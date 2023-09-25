<?php

namespace App\Services\Vault\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Global\Http\Requests\SearchRequest;
use App\Global\Traits\ResponseTrait;
use App\Services\Vault\Http\Requests\VaultStoreRequest;
use App\Services\Vault\Http\Resources\VaultResource;
use App\Services\Vault\Models\Vault;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class VaultController extends Controller
{
    use ResponseTrait;

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('vaultView', Vault::class);
        $vaultQuery = Vault::query();
        if ($search = request()->query('search')) {
            $vaultQuery->where('name', 'ILIKE', "%$search%")
                       ->orWhereHas('currency', function (Builder $builder) use ($search) {
                           $builder->where('code', 'ILIKE', "%$search%");;
                       });
        }
        return VaultResource::collection($vaultQuery->paginate());
    }


    public function search(SearchRequest $request): AnonymousResourceCollection
    {
        $this->authorize('vaultView', Vault::class);
        $vaultQuery = Vault::query();
        $vaultQuery->whereRaw($request->get('expression'), $request->get('bindings'));
        $vaultQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'desc');
        return VaultResource::collection($vaultQuery->paginate());
    }

    public function store(VaultStoreRequest $request): ?JsonResponse
    {
        $this->authorize('vaultStore', Vault::class);
        DB::transaction(static function () use ($request) {
            Vault::create($request->safe()->all());
        });
        return $this->success('vault created', statusCode: Response::HTTP_CREATED);
    }

    public function show(Vault $vault): VaultResource
    {
        $this->authorize('vaultView', Vault::class);
        return VaultResource::make($vault);
    }

    public function update(Vault $vault, VaultStoreRequest $request): ?JsonResponse
    {
        $this->authorize('vaultUpdate', Vault::class);
        DB::transaction(static function () use ($vault, $request) {
            $vault->update($request->safe()->all());
        });
        return $this->success('vault updated');
    }

    public function destroy(Vault $vault): ?JsonResponse
    {
        $this->authorize('vaultDelete', Vault::class);
        DB::transaction(static function () use ($vault) {
            $vault->delete();
        });
        return $this->success('vault deleted');
    }

}

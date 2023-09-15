<?php

namespace App\Services\Vault\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Services\Vault\Http\Requests\VaultStoreRequest;
use App\Services\Vault\Http\Resources\VaultResource;
use App\Services\Vault\Models\Vault;
use App\Traits\ResponseTrait;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class VaultController extends Controller
{
    use ResponseTrait;

    public function index()
    {
        $this->authorize('vaultView', Vault::class);
        return VaultResource::collection(Vault::paginate());
    }


    public function search(SearchRequest $request)
    {
        $this->authorize('vaultView', Vault::class);
        $vaultQuery = Vault::query();
        $vaultQuery->whereRaw($request->get('expression'), $request->get('bindings'));
        $vaultQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'desc');
        return VaultResource::collection($vaultQuery->paginate());
    }

    public function store(VaultStoreRequest $request)
    {
        $this->authorize('vaultStore', Vault::class);
        try {
            DB::beginTransaction();
            Vault::create($request->safe()->all());
            DB::commit();
            return $this->success('vault created', statusCode: Response::HTTP_CREATED);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    public function show(Vault $vault)
    {
        $this->authorize('vaultView', Vault::class);
        return VaultResource::make($vault);
    }

    public function update(Vault $vault, VaultStoreRequest $request)
    {
        $this->authorize('vaultUpdate', Vault::class);
        try {
            DB::beginTransaction();
            $vault->update($request->safe()->all());
            DB::commit();
            return $this->success('vault updated');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    public function destroy(Vault $vault)
    {
        $this->authorize('vaultDelete', Vault::class);
        try {
            DB::beginTransaction();
            $vault->delete();
            DB::commit();
            return $this->success('vault deleted');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

}

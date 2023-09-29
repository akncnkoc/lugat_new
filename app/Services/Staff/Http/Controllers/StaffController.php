<?php

namespace App\Services\Staff\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Global\Http\Requests\SearchRequest;
use App\Global\Traits\ResponseTrait;
use App\Services\Staff\Http\Requests\StaffStoreRequest;
use App\Services\Staff\Http\Resources\StaffResource;
use App\Services\Staff\Models\Staff;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class StaffController extends Controller
{
    use ResponseTrait;


    public function index(): AnonymousResourceCollection
    {
        $this->authorize('staffView', Staff::class);
        $staffQuery = Staff::query();
        if ($search = request()?->query('search')) {
            $staffQuery->whereRaw("CONCAT(`name`, `surname`) = ?", [$search]);
        }
        return StaffResource::collection($staffQuery->orderBy('name')->paginate());
    }


    public function search(SearchRequest $request): AnonymousResourceCollection
    {
        $this->authorize('staffView', Staff::class);
        $staffQuery = Staff::query();
        $staffQuery->whereRaw($request->get('expression'), $request->get('bindings'));
        $staffQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'desc');
        return StaffResource::collection($staffQuery->paginate());
    }

    public function store(StaffStoreRequest $request): ?JsonResponse
    {
        $this->authorize('staffStore', Staff::class);
        DB::transaction(static function () use ($request) {
            Staff::create($request->safe()->all());
        });
        return $this->success('staff created', statusCode: Response::HTTP_CREATED);
    }

    public function show(Staff $staff): StaffResource
    {
        $this->authorize('staffView', Staff::class);
        return StaffResource::make($staff);
    }

    public function update(Staff $staff, StaffStoreRequest $request): ?JsonResponse
    {
        $this->authorize('staffUpdate', Staff::class);
        DB::transaction(static function () use ($staff, $request) {
            $staff->update($request->safe()->all());
        });
        return $this->success('staff updated');
    }

    public function destroy(Staff $staff): ?JsonResponse
    {
        $this->authorize('staffDelete', Staff::class);
        DB::transaction(static function () use ($staff) {
            $staff->delete();
        });
        return $this->success('staff deleted');
    }
}

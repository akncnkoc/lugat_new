<?php

namespace App\Services\Product\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Services\Product\Database\Factories\VariantResource;
use App\Services\Product\Http\Requests\VariantStoreRequest;
use App\Services\Product\Models\Product;
use App\Services\Product\Models\Variant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class VariantController extends Controller
{


    public function index(): AnonymousResourceCollection
    {
        $this->authorize('productView', Product::class);
        $variant = Variant::query();
        if ($search = request()?->query('search')) {
            $variant->where("name", $search);
        }
        $variant->whereNull('parent_id');
        return VariantResource::collection($variant->orderBy('name')->paginate());
    }

    public function show(Variant $variant): VariantResource
    {
        $this->authorize('productView', Product::class);
        return VariantResource::make($variant)->additional([
            'sub_variants' => $variant->subVariants()->orderBy('name')->paginate(),
            'parent'       => Variant::firstWhere('id', $variant->parent_id)
        ]);
    }

    public function create(VariantStoreRequest $request): JsonResponse
    {
        $this->authorize('productStore', Product::class);
        DB::transaction(static function () use ($request) {
            Variant::create($request->safe()->all());
        });
        return $this->success('variant created', statusCode: Response::HTTP_CREATED);
    }

    public function update(VariantStoreRequest $request, Variant $variant): JsonResponse
    {
        $this->authorize('productUpdate', Product::class);
        DB::transaction(static function () use ($variant, $request) {
            $variant->update($request->safe()->all());
        });
        return $this->success('variant updated');
    }

    public function destroy(Variant $variant): JsonResponse
    {
        $this->authorize('productDelete', Product::class);
        DB::transaction(static function () use ($variant) {
            $variant->delete();
        });
        return $this->success('variant deleted');
    }
}

<?php

namespace App\Services\Product\Http\Controllers;


use App\Global\Http\Controllers\Controller;
use App\Global\Http\Requests\SearchRequest;
use App\Global\Traits\ResponseTrait;
use App\Services\Product\Http\Requests\ProductStoreRequest;
use App\Services\Product\Http\Resources\ProductResource;
use App\Services\Product\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    use ResponseTrait;

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('productView', Product::class);
        return ProductResource::collection(Product::paginate());
    }


    public function search(SearchRequest $request): AnonymousResourceCollection
    {
        $this->authorize('productView', Product::class);
        $productQuery = Product::query();
        $productQuery->whereRaw($request->get('expression'), $request->get('bindings'));
        $productQuery->orderBy($request->get('orderByColumn') ?? 'id', $request->get('orderByColumnDirection') ?? 'desc');
        return ProductResource::collection($productQuery->paginate());
    }

    public function store(ProductStoreRequest $request): ?JsonResponse
    {
        $this->authorize('productStore', Product::class);
        DB::transaction(static function () use ($request) {
            Product::create($request->safe()->all());
        });
        return $this->success('product created', statusCode: Response::HTTP_CREATED);
    }

    public function show(Product $product): ProductResource
    {
        $this->authorize('productView', Product::class);
        return ProductResource::make($product);
    }

    public function update(Product $product, ProductStoreRequest $request): ?JsonResponse
    {
        $this->authorize('productUpdate', Product::class);
        DB::transaction(static function () use ($product, $request) {
            $product->update($request->safe()->all());
        });
        return $this->success('product updated');
    }

    public function destroy(Product $product): ?JsonResponse
    {
        $this->authorize('productDelete', Product::class);
        DB::transaction(static function () use ($product) {
            $product->delete();
        });
        return $this->success('product deleted');
    }
}

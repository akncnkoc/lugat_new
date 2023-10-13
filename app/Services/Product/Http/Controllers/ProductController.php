<?php

namespace App\Services\Product\Http\Controllers;


use App\Global\Http\Controllers\Controller;
use App\Global\Http\Requests\SearchRequest;
use App\Global\Traits\ResponseTrait;
use App\Services\Product\Http\Requests\ProductStoreRequest;
use App\Services\Product\Http\Resources\ProductResource;
use App\Services\Product\Models\Product;
use App\Services\Product\Models\SubProduct;
use App\Services\Product\Traits\ProductImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use JsonException;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    use ProductImageUpload;

    public function index(SearchRequest $request): AnonymousResourceCollection
    {
        $this->authorize('productView', Product::class);
        $productQuery = Product::query();
        if ($search = request()?->query('search')) {
            $productQuery->where('name', 'ILIKE', "%$search%")
                         ->orWhere('model_code', 'ILIKE', "%$search%");
        }
        if ($request->has('expression')) {
            $productQuery->whereRaw($request->get('expression'), $request->get('bindings'));
        }
        if ($request->has('orderByColumn') && $request->has('orderByColumnDirection')) {
            $orderByColumn = $request->get('orderByColumn');
            $orderByColumnDirection = $request->get('orderByColumnDirection');
            $productQuery->orderBy($orderByColumn, $orderByColumnDirection);
        }
        return ProductResource::collection($productQuery->paginate());
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
        DB::transaction(function () use ($request) {
            $product = Product::create($request->safe()->only('name'));
            if ($request->safe()->has('sub_products')) {
                $this->storeSubProducts(collect($request->safe()->only('sub_products')['sub_products']), $product);
            }
            if ($request->safe()->has('suppliers')) {
                $this->storeProductSuppliers($request->safe()->only('suppliers')['suppliers'], $product);
            }
        });
        return $this->success('product created', statusCode: Response::HTTP_CREATED);
    }

    /**
     * @param  Collection  $subProducts
     * @param  Product  $product
     * @throws JsonException
     */
    protected function storeSubProducts(Collection $subProducts, Product $product): void
    {
        foreach ($subProducts as $subProductItem) {
            $subProduct = $product->subProducts()->create([
                'name'             => $subProductItem["name"],
                'sku'              => $subProductItem["sku"],
                'barcode'          => $subProductItem["barcode"],
                'buy_price'        => $subProductItem["buy_price"],
                'sell_price'       => $subProductItem["sell_price"],
                'stock'            => $subProductItem["stock"],
                'buy_currency_id'  => $subProductItem["buy_currency_id"],
                'sell_currency_id' => $subProductItem["sell_currency_id"],
                'tax'              => $subProductItem["tax"],
            ]);
            if (isset($subProductItem["variants"])) {
                $this->storeSubProductVariants($subProductItem["variants"], $subProduct);
            }
            if (isset($subProductItem["images"])) {
                $this->uploadImagesForSubProduct($product, $subProduct, $subProductItem["images"]);
            }
        }
    }

    protected function storeSubProductVariants(array $variants, SubProduct $subProduct): void
    {
        foreach ($variants as $variant) {
            $subProduct->subProductVariants()->create([
                'variant_id' => $variant
            ]);
        }
    }

    public function storeProductSuppliers(array $suppliers, Product $product): void
    {
        foreach ($suppliers as $supplier) {
            $product->productSuppliers()->create([
                'supplier_id' => $supplier
            ]);
        }
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
            $product->subProducts()->each(function (SubProduct $subProduct) {
                $subProduct->subProductVariants()->delete();
                $subProduct->subProductImages()->delete();
            });
            $product->subProducts()->delete();
            $product->delete();
        });
        return $this->success('product deleted');
    }
}

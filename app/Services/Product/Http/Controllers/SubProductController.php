<?php

namespace App\Services\Product\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Global\Traits\ResponseTrait;
use App\Services\Product\Http\Requests\SubProductStoreRequest;
use App\Services\Product\Models\Product;
use App\Services\Product\Models\SubProduct;
use App\Services\Product\Traits\ProductImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use JsonException;

class SubProductController extends Controller
{
    use  ProductImageUpload;


    public function destroy(SubProduct $subProduct): ?JsonResponse
    {
        $this->authorize('productDelete', Product::class);
        DB::transaction(static function () use ($subProduct) {
            $subProduct->delete();
        });
        return $this->success('sub product deleted');
    }

    /**
     * @param  SubProductStoreRequest  $request
     * @param  Product  $product
     * @throws JsonException
     */
    protected function storeSubProducts(SubProductStoreRequest $request, Product $product): void
    {
        $this->authorize('productUpdate', Product::class);
        foreach ($request->get('sub_products') as $subProductItem) {
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

    /**
     * @param  SubProductStoreRequest  $request
     * @throws JsonException
     */
    protected function updateSubProducts(SubProductStoreRequest $request): void
    {
        $this->authorize('productUpdate', Product::class);
        foreach ($request->get('sub_products') as $subProductItem) {
            $subProduct = SubProduct::find($subProductItem['id']);
            $subProduct->update([
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
                $this->updateSubProductVariants($subProductItem["variants"], $subProduct);
            }
            if (isset($subProductItem["images"])) {
                $this->uploadImagesForSubProduct($subProduct->product, $subProduct, $subProductItem["images"]);
            }
        }
    }

    protected function updateSubProductVariants(array $variants, SubProduct $subProduct): void
    {
        $subProduct->subProductVariants()->forceDelete();
        foreach ($variants as $variant) {
            $subProduct->subProductVariants()->create([
                'variant_id' => $variant
            ]);
        }
    }
}

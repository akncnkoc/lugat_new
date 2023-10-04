<?php

namespace App\Services\Product\Http\Controllers;


use App\Global\Http\Controllers\Controller;
use App\Global\Traits\ResponseTrait;
use App\Services\Product\Http\Requests\ProductImageStoreRequest;
use App\Services\Product\Http\Resources\ProductImageResource;
use App\Services\Product\Models\Product;
use App\Services\Product\Models\SubProductImage;
use App\Services\Product\Traits\ProductImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\Response;

class ProductImageController extends Controller
{
    use ResponseTrait, ProductImageUpload;

    public function show(SubProductImage $productImage)
    {

    }

    public function index(Product $product): AnonymousResourceCollection
    {
        $this->authorize('productImageView', SubProductImage::class);
        return ProductImageResource::collection($product->productImages()->paginate());
    }

    public function store(ProductImageStoreRequest $request, Product $product): ?JsonResponse
    {
        $this->authorize('productImageStore', SubProductImage::class);
        DB::transaction(static function () use ($request, $product) {
            $this->uploadImagesForProduct($product, $request->file('images'));
        });
        return $this->success('product image stored', statusCode: Response::HTTP_CREATED);
    }

    public function destroy(Product $product, SubProductImage $productImage): ?JsonResponse
    {
        $this->authorize('productImageDelete', SubProductImage::class);
        DB::transaction(static function () use ($product, $productImage) {
            if (File::exists(storage_path($productImage->path)) && $product->productImages()->where('id', $productImage->id)->exists()) {
                $fileIsMoved = File::move(storage_path($productImage->path), storage_path("app/product/$product->id/trashed"));
                $extension = File::extension($productImage->path);
                $filename = File::basename($productImage->path);
                if ($fileIsMoved) {
                    $productImage->update([
                        'deleted_at' => now(),
                        'path'       => "app/product/$product->id/trashed/$filename.$extension"
                    ]);
                }
            }
        });
        return $this->success('product image removed');
    }
}

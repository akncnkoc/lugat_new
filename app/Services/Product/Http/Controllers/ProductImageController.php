<?php

namespace App\Services\Product\Http\Controllers;


use App\Global\Http\Controllers\Controller;
use App\Global\Traits\ResponseTrait;
use App\Services\Product\Http\Requests\ProductImageStoreRequest;
use App\Services\Product\Http\Resources\ProductImageResource;
use App\Services\Product\Models\Product;
use App\Services\Product\Models\ProductImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Request;use Intervention\Image\ImageManager;
use Symfony\Component\HttpFoundation\Response;

class ProductImageController extends Controller
{
    use ResponseTrait;

    public function show(ProductImage $productImage){

    }
    public function index(Product $product): AnonymousResourceCollection
    {
        $this->authorize('productImageView', ProductImage::class);
        return ProductImageResource::collection($product->productImages()->paginate());
    }

    public function store(ProductImageStoreRequest $request, Product $product): ?JsonResponse
    {
        $this->authorize('productImageStore', ProductImage::class);
        DB::transaction(static function () use ($request, $product) {
            foreach ($request->file('images') as $image) {
                $image->storePubliclyAs("product/$product->id/images", $image->hashName());
                $manager = new ImageManager;
                $savedPath = "app/product/$product->id/images/".$image->hashName();
                $manager->make(storage_path($savedPath))
                        ->resize(1024, 768, fn($constraint) => $constraint->aspectRatio())
                        ->insert(public_path('assets/companylogowatermark.png'), 'bottom-right', 20, 20)
                        ->save(storage_path($savedPath));
                ProductImage::create([
                    'path'       => "app/product/$product->id/images/".$image->hashName(),
                    'product_id' => $product->id,
                    'properties' => json_encode([
                        'width'     => $image->dimensions()[0],
                        'height'    => $image->dimensions()[1],
                        'size'      => $image->getSize(),
                        'extension' => $image->extension()
                    ], JSON_THROW_ON_ERROR),
                ]);
            }
        });
        return $this->success('product image stored', statusCode: Response::HTTP_CREATED);
    }

    public function destroy(Product $product, ProductImage $productImage): ?JsonResponse
    {
        $this->authorize('productImageDelete', ProductImage::class);
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

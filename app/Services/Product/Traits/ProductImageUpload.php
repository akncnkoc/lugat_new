<?php

namespace App\Services\Product\Traits;

use App\Services\Product\Models\Product;
use App\Services\Product\Models\SubProduct;
use App\Services\Product\Models\SubProductImage;
use Illuminate\Http\UploadedFile;
use Intervention\Image\ImageManager;

trait ProductImageUpload
{
    /**
     * @param  SubProduct  $subProduct
     * @param  array|UploadedFile|UploadedFile[]|null  $images
     * @return void
     * @throws \JsonException
     */
    public function uploadImagesForSubProduct(Product $product, SubProduct $subProduct, array $images): void
    {
        foreach ($images as $image) {
            $image->storePubliclyAs("product/$product->id/sub_products/$subProduct->id/images", $image->hashName());
            $manager = new ImageManager;
            $savedPath = "app/product/$product->id/sub_products/$subProduct->id/images/".$image->hashName();
            $manager->make(storage_path($savedPath))
                    ->resize(1024, 768, fn($constraint) => $constraint->aspectRatio())
                    ->insert(public_path('assets/companylogowatermark.png'), 'bottom-right', 20, 20)
                    ->save(storage_path($savedPath));
            SubProductImage::create([
                'path'       => "app/product/$product->id/sub_products/$subProduct->id/images/".$image->hashName(),
                'product_id' => $product->id,
                'properties' => json_encode([
                    'width'     => $image->dimensions()[0],
                    'height'    => $image->dimensions()[1],
                    'size'      => $image->getSize(),
                    'extension' => $image->extension()
                ], JSON_THROW_ON_ERROR),
            ]);
        }
    }
}

<?php

namespace App\Services\Product\Database\Factories;

use App\Services\Product\Models\SubProductImage;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\Testing\File;
use JsonException;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Services\Product\Models\Product>
 */
class SubProductImageFactory extends Factory
{
    protected $model = SubProductImage::class;

    /**
     * @throws JsonException
     */
    public function definition(): array
    {
        $file = File::image('image.png', 120, 200);

        return [
            'path' => $file->path(),
            'properties' => json_encode([
                'width' => $file->dimensions()[0],
                'height' => $file->dimensions()[1],
                'size' => $file->getSize(),
                'extension' => $file->extension()
            ], JSON_THROW_ON_ERROR),
        ];
    }
}

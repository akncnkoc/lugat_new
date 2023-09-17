<?php

namespace App\Services\Product\Tests\Feature;

use App\Services\Product\Database\Seeders\ProductWithImagesSeeder;
use App\Services\Product\Models\Product;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ProductImageTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    protected User $user;
    protected Product $product;
    protected array $params;
    protected string $searchExpression;
    protected array $searchBindings;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->seed(ProductWithImagesSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->product = Product::has('productImages')->first();
    }

    public function setParams(): array
    {
        return [
            'images' => [
                UploadedFile::fake()->image('image.png', 200, 200),
                UploadedFile::fake()->image('image2.png', 200, 200),
                UploadedFile::fake()->image('image3.png', 200, 200),
            ],
        ];
    }

    public function test_authenticated_user_can_get_product_images_list(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('product-image.index.ts', $this->product->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'path', 'properties']
            ], 'links', 'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_product_list(): void
    {
        $response = $this->getJson(route('product-image.index.ts', $this->product->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_product_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view product image');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('product-image.index.ts', $this->product->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_store_product_image(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->post(route('product-image.store', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('product_images', [
            'product_id' => $this->product->id,
            'created_at' => now()
        ]);
        Storage::exists(storage_path('app/product/'.$this->product->id."/images/".$this->params['images'][0]));
        File::deleteDirectory(storage_path('app/product'));
    }


    public function test_authenticated_user_cant_store_product_images_wrong_params(): void
    {
        unset($this->params['images'][0]);
        unset($this->params['images'][1]);
        unset($this->params['images'][2]);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('product-image.store', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_product_image(): void
    {
        $response = $this->postJson(route('product-image.store', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_product_without_permission(): void
    {
        $this->user->revokePermissionTo('store product image');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('product-image.store', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_product_image(): void
    {
        Storage::fake();
        Sanctum::actingAs($this->user);
        $productImage = $this->product->productImages()->first();
        $response = $this->deleteJson(route('product-image.destroy', ['product' => $this->product->id, 'productImage' => $productImage->id]));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_unauthenticated_user_cant_destroy_product_image(): void
    {
        $productImage = $this->product->productImages()->first();
        $response = $this->deleteJson(route('product-image.destroy', ['product' => $this->product->id, 'productImage' => $productImage->id]), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_product_without_permission(): void
    {
        $productImage = $this->product->productImages()->first();
        $this->user->revokePermissionTo('delete product image');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('product-image.destroy',  ['product' => $this->product->id, 'productImage' => $productImage->id]), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

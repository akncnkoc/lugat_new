<?php

namespace App\Services\Product\Tests\Feature;

use App\Services\Product\Database\Seeders\ProductWithSuppliersSeeder;
use App\Services\Product\Models\Product;
use App\Services\Supplier\Models\Supplier;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ProductSupplierTest extends TestCase
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
        $this->seed(ProductWithSuppliersSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->product = Product::has('productSuppliers')->first();
    }

    public function setParams(): array
    {
        return [
            'suppliers' => [
                ['supplier_id' => Supplier::factory()->create()->id],
                ['supplier_id' => Supplier::factory()->create()->id],
                ['supplier_id' => Supplier::factory()->create()->id],
            ],
        ];
    }

    public function test_authenticated_user_can_store_product_supplier(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->post(route('product-supplier.store', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('product_suppliers', [
            'product_id'  => $this->product->id,
            'supplier_id' => $this->params['suppliers'][0]['supplier_id']
        ]);
    }


    public function test_authenticated_user_cant_store_product_suppliers_wrong_params(): void
    {
        $this->params['suppliers'][0]['supplier_id'] = Str::uuid();
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('product-supplier.store', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_product_supplier(): void
    {
        $response = $this->postJson(route('product-supplier.store', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_product_suppliers_without_permission(): void
    {
        $this->user->revokePermissionTo('store product supplier');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('product-supplier.store', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_product_supplier(): void
    {
        Sanctum::actingAs($this->user);
        $productSupplier = $this->product->productSuppliers()->first();
        $response = $this->deleteJson(route('product-supplier.destroy', ['productSupplier' => $productSupplier->id, 'product' => $this->product->id]));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseMissing('product_suppliers', [
            'product_id'  => $this->product->id,
            'supplier_id' => $productSupplier->id
        ]);
    }

    public function test_unauthenticated_user_cant_destroy_product_supplier(): void
    {
        $productSupplier = $this->product->productSuppliers()->first();
        $response = $this->deleteJson(route('product-supplier.destroy', ['productSupplier' => $productSupplier->id, 'product' => $this->product->id]), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_product_supplier_without_permission(): void
    {
        $productSupplier = $this->product->productSuppliers()->first();
        $this->user->revokePermissionTo('delete product supplier');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('product-supplier.destroy', ['productSupplier' => $productSupplier->id, 'product' => $this->product->id]), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

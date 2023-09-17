<?php

namespace App\Services\Product\Tests\Feature;

use App\Services\Product\Database\Seeders\ProductSeeder;
use App\Services\Product\Models\Product;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use App\Services\Vault\Models\Vault;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ProductTest extends TestCase
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
        $this->seed(ProductSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->product = Product::first();
    }

    public function setParams(): array
    {
        return [
            'name' => $this->faker->name,
            'model_code' => $this->faker->email,
            'buy_price' => $this->faker->numberBetween(100, 200),
            'sell_price' => $this->faker->numberBetween(100, 200),
            'buy_price_vault_id' => Vault::factory()->create()->id,
            'sell_price_vault_id' => Vault::factory()->create()->id,
        ];
    }

    public function test_authenticated_user_can_get_product_list(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('product.index.ts'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'model_code', 'buy_price', 'sell_price', 'buy_price_vault', 'sell_price_vault', 'critical_stock_alert']
            ], 'links', 'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_product_list(): void
    {
        $response = $this->getJson(route('product.index.ts'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_product_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view product');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('product.index.ts'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_product(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('product.show', $this->product->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id', 'name', 'model_code', 'buy_price', 'sell_price', 'buy_price_vault', 'sell_price_vault', 'critical_stock_alert'
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_product(): void
    {
        $response = $this->getJson(route('product.show', $this->product->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_product_without_permission(): void
    {
        $this->user->revokePermissionTo('view product');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('product.show', $this->product->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_cant_store_product_if_database_cannot_connected(): void
    {
        Sanctum::actingAs($this->user);
        DB::disconnect();
        $response = $this->postJson(route('product.store'), $this->params);
        $response->assertStatus(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function test_authenticated_user_can_store_product(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('product.store'), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('products', [
            'name' => $this->params['name']
        ]);
    }



    public function test_authenticated_user_cant_store_product_wrong_params(): void
    {
        unset($this->params['name']);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('product.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_product(): void
    {
        $response = $this->postJson(route('product.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_product_without_permission(): void
    {
        $this->user->revokePermissionTo('store product');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('product.store'), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_product(): void
    {
        Sanctum::actingAs($this->user);
        $this->params['name'] = $this->faker->name;
        $response = $this->putJson(route('product.update', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('products', [
            'id' => $this->product->id,
            'name' => $this->params['name']
        ]);
    }

    public function test_unauthenticated_user_can_update_product(): void
    {
        $response = $this->putJson(route('product.update', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_product_without_permission(): void
    {
        $this->user->revokePermissionTo('update product');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('product.update', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_product(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('product.destroy', $this->product->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('products', [
            'id' => $this->product->id,
        ]);
    }

    public function test_unauthenticated_user_can_destroy_product(): void
    {
        $response = $this->deleteJson(route('product.destroy', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_product_without_permission(): void
    {
        $this->user->revokePermissionTo('delete product');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('product.destroy', $this->product->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_products_search_list(): void
    {
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('product.search'), [
            'expression' => $this->searchExpression,
            'bindings' => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'model_code', 'buy_price', 'sell_price', 'buy_price_vault', 'sell_price_vault', 'critical_stock_alert']
            ], 'links', 'meta'
        ]);
    }

    public function test_authenticated_user_cant_get_products_search_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view product');
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('product.search'), [
            'expression' => $this->searchExpression,
            'bindings' => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

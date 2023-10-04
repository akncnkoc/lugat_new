<?php

namespace App\Services\Supplier\Tests\Feature;

use App\Services\Supplier\Database\Seeders\SupplierSeeder;
use App\Services\Supplier\Models\Supplier;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class SupplierTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    protected User $user;
    protected Supplier $supplier;
    protected array $params;
    protected string $searchExpression;
    protected array $searchBindings;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->seed(SupplierSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->supplier = Supplier::first();
    }

    public function setParams(): array
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber
        ];
    }

    public function test_authenticated_user_can_get_supplier_list(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('supplier.index.tsx'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name',  'email', 'phone']
            ], 'links', 'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_supplier_list(): void
    {
        $response = $this->getJson(route('supplier.index.tsx'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_supplier_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view supplier');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('supplier.index.tsx'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_supplier(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('supplier.show', $this->supplier->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id', 'name', 'email', 'phone'
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_supplier(): void
    {
        $response = $this->getJson(route('supplier.show', $this->supplier->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_supplier_without_permission(): void
    {
        $this->user->revokePermissionTo('view supplier');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('supplier.show', $this->supplier->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_cant_store_supplier_if_database_cannot_connected(): void
    {
        Sanctum::actingAs($this->user);
        DB::disconnect();
        $response = $this->postJson(route('supplier.store'), $this->params);
        $response->assertStatus(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function test_authenticated_user_can_store_supplier(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('supplier.store'), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('suppliers', [
            'name' => $this->params['name']
        ]);
    }

    public function test_authenticated_user_cant_store_supplier_wrong_params(): void
    {
        unset($this->params['name']);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('supplier.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_supplier(): void
    {
        $response = $this->postJson(route('supplier.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_supplier_without_permission(): void
    {
        $this->user->revokePermissionTo('store supplier');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('supplier.store'), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_supplier(): void
    {
        Sanctum::actingAs($this->user);
        $this->params['name'] = $this->faker->name;
        $response = $this->putJson(route('supplier.update', $this->supplier->id), $this->params);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('suppliers', [
            'id' => $this->supplier->id,
            'name' => $this->params['name']
        ]);
    }

    public function test_unauthenticated_user_can_update_supplier(): void
    {
        $response = $this->putJson(route('supplier.update', $this->supplier->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_supplier_without_permission(): void
    {
        $this->user->revokePermissionTo('update supplier');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('supplier.update', $this->supplier->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_supplier(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('supplier.destroy', $this->supplier->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('suppliers', [
            'id' => $this->supplier->id,
        ]);
    }

    public function test_unauthenticated_user_can_destroy_supplier(): void
    {
        $response = $this->deleteJson(route('supplier.destroy', $this->supplier->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_supplier_without_permission(): void
    {
        $this->user->revokePermissionTo('delete supplier');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('supplier.destroy', $this->supplier->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_suppliers_search_list(): void
    {
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('supplier.search'), [
            'expression' => $this->searchExpression,
            'bindings' => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'email', 'phone']
            ], 'links', 'meta'
        ]);
    }

    public function test_authenticated_user_cant_get_suppliers_search_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view supplier');
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('supplier.search'), [
            'expression' => $this->searchExpression,
            'bindings' => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

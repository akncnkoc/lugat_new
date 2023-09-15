<?php

namespace App\Services\Customer\Tests\Feature;

use App\Services\Customer\Database\Seeders\CustomerRoleSeeder;
use App\Services\Customer\Models\CustomerRole;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class CustomerRoleTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    protected User $user;
    protected CustomerRole $customerRole;
    protected array $params;
    protected string $searchExpression;
    protected array $searchBindings;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->seed(CustomerRoleSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->customerRole = CustomerRole::first();
    }

    public function setParams(): array
    {
        return [
            'name' => $this->faker->colorName,
        ];
    }

    public function test_authenticated_user_can_get_customer_roles_list()
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customerRole.index'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name']
            ], 'links', 'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_customer_roles_list()
    {
        $response = $this->getJson(route('customerRole.index'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_customer_role_list_without_permission()
    {
        $this->user->revokePermissionTo('view customer role');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customerRole.index'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_customer_role()
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customerRole.show', $this->customerRole->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id', 'name'
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_customer_role()
    {
        $response = $this->getJson(route('customerRole.show', $this->customerRole->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_customer_role_without_permission()
    {
        $this->user->revokePermissionTo('view customer role');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customerRole.show', $this->customerRole->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_store_customer_role()
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('customerRole.store'), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('customer_roles', [
            'name' => $this->customerRole->name
        ]);
    }

    public function test_authenticated_user_cant_store_customer_role_wrong_params()
    {
        unset($this->params['name']);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('customerRole.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_customer_role()
    {
        $response = $this->postJson(route('customerRole.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_customer_role_without_permission()
    {
        $this->user->revokePermissionTo('store customer role');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('customerRole.store'), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_customer_role()
    {
        Sanctum::actingAs($this->user);
        $this->params['name'] = $this->faker->name;
        $response = $this->putJson(route('customerRole.update', $this->customerRole->id), $this->params);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('customer_roles', [
            'id'   => $this->customerRole->id,
            'name' => $this->params['name']
        ]);
    }

    public function test_unauthenticated_user_cant_update_customer_role()
    {
        $response = $this->putJson(route('customerRole.update', $this->customerRole->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_customer_role_without_permission()
    {
        $this->user->revokePermissionTo('update customer role');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('customerRole.update', $this->customerRole->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_customer_role()
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('customerRole.destroy', $this->customerRole->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('customer_roles', [
            'id' => $this->customerRole->id,
        ]);
    }

    public function test_unauthenticated_user_cant_destroy_customer_role()
    {
        $response = $this->deleteJson(route('customerRole.destroy', $this->customerRole->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_customer_role_without_permission()
    {
        $this->user->revokePermissionTo('delete customer role');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('customerRole.destroy', $this->customerRole->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_customer_roles_search_list()
    {
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('customerRole.search'), [
            'expression' => $this->searchExpression,
            'bindings'   => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name']
            ], 'links', 'meta'
        ]);
    }

    public function test_authenticated_user_cant_get_customer_roles_search_list_without_permission()
    {
        $this->user->revokePermissionTo('view customer role');
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('customerRole.search'), [
            'expression' => $this->searchExpression,
            'bindings'   => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

<?php

namespace App\Services\Customer\Tests\Feature;

use App\Services\Customer\Database\Seeders\CustomerTypesSeeder;
use App\Services\Customer\Models\CustomerType;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class CustomerTypeTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    protected User $user;
    protected CustomerType $customerType;
    protected array $params;
    protected string $searchExpression;
    protected array $searchBindings;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->seed(CustomerTypesSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->customerType = CustomerType::first();
    }

    public function setParams(): array
    {
        return [
            'name' => $this->faker->colorName,
        ];
    }

    public function test_authenticated_user_can_get_customer_types_list(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customer-type.index'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name']
            ],
            'links',
            'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_customer_types_list(): void
    {
        $response = $this->getJson(route('customer-type.index'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_customer_type_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view customer type');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customer-type.index'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_customer_type()
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customer-type.show', $this->customerType->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name'
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_customer_type(): void
    {
        $response = $this->getJson(route('customer-type.show', $this->customerType->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_customer_type_without_permission(): void
    {
        $this->user->revokePermissionTo('view customer type');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customer-type.show', $this->customerType->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_store_customer_type(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('customer-type.store'), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('customer_types', [
            'name' => $this->customerType->name
        ]);
    }

    public function test_authenticated_user_cant_store_customer_type_wrong_params(): void
    {
        unset($this->params['name']);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('customer-type.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_customer_type(): void
    {
        $response = $this->postJson(route('customer-type.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_customer_type_without_permission(): void
    {
        $this->user->revokePermissionTo('store customer type');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('customer-type.store'), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_customer_type(): void
    {
        Sanctum::actingAs($this->user);
        $this->params['name'] = $this->faker->name;
        $response = $this->putJson(route('customer-type.update', $this->customerType->id), $this->params);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('customer_types', [
            'id' => $this->customerType->id,
            'name' => $this->params['name']
        ]);
    }

    public function test_unauthenticated_user_cant_update_customer_type(): void
    {
        $response = $this->putJson(route('customer-type.update', $this->customerType->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_customer_type_without_permission(): void
    {
        $this->user->revokePermissionTo('update customer type');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('customer-type.update', $this->customerType->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_customer_type(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('customer-type.destroy', $this->customerType->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('customer_types', [
            'id' => $this->customerType->id,
        ]);
    }

    public function test_unauthenticated_user_cant_destroy_customer_type(): void
    {
        $response = $this->deleteJson(route('customer-type.destroy', $this->customerType->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_customer_type_without_permission(): void
    {
        $this->user->revokePermissionTo('delete customer type');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('customer-type.destroy', $this->customerType->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_customer_types_search_list(): void
    {
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('customer-type.search'), [
            'expression' => $this->searchExpression,
            'bindings' => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name']
            ],
            'links',
            'meta'
        ]);
    }

    public function test_authenticated_user_cant_get_customer_types_search_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view customer type');
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('customer-type.search'), [
            'expression' => $this->searchExpression,
            'bindings' => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

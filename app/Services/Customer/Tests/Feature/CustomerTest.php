<?php

namespace App\Services\Customer\Tests\Feature;

use App\Services\Customer\Database\Seeders\CustomerRoleSeeder;
use App\Services\Customer\Database\Seeders\CustomerSeeder;
use App\Services\Customer\Models\Customer;
use App\Services\Customer\Models\CustomerRole;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class CustomerTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    protected User $user;
    protected Customer $customer;
    protected array $params;
    protected string $searchExpression;
    protected array $searchBindings;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->seed(CustomerSeeder::class);
        $this->seed(CustomerRoleSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->customer = Customer::first();
    }

    public function setParams(): array
    {
        return [
            'name'             => $this->faker->name,
            'surname'          => $this->faker->lastName,
            'phone'            => $this->faker->e164PhoneNumber(),
            'email'            => $this->faker->email,
            'comment'          => $this->faker->sentence,
            'address'          => $this->faker->address,
            'neighborhood'     => $this->faker->colorName,
            'district'         => $this->faker->colorName,
            'city'             => $this->faker->city,
            'gender'           => $this->faker->boolean(),
            'post_code'        => $this->faker->postcode,
            'customer_role_id' => CustomerRole::inRandomOrder()->first()->id
        ];
    }

    public function test_authenticated_user_can_get_customers_list()
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customer.index'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'surname', 'email', 'phone', 'gender', 'customer_role', 'city', 'district', 'neighborhood', 'address', 'comment']
            ], 'links', 'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_customers_list()
    {
        $response = $this->getJson(route('customer.index'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_customers_list_without_permission()
    {
        $this->user->revokePermissionTo('view customer');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customer.index'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_customer()
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customer.show', $this->customer->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id', 'name', 'surname', 'email', 'phone', 'gender', 'customer_role', 'city', 'district', 'neighborhood', 'address', 'comment'
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_customer()
    {
        $response = $this->getJson(route('customer.show', $this->customer->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_customer_without_permission()
    {
        $this->user->revokePermissionTo('view customer');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('customer.show', $this->customer->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_cant_store_customer_if_database_cannot_connected()
    {
        Sanctum::actingAs($this->user);
        DB::disconnect();
        $response = $this->postJson(route('customer.store'), $this->params);
        $response->assertStatus(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function test_authenticated_user_can_store_customer()
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('customer.store'), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('customers', [
            'name' => $this->customer->name
        ]);
    }

    public function test_authenticated_user_cant_store_customer_wrong_params()
    {
        unset($this->params['name']);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('customer.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_customer()
    {
        $response = $this->postJson(route('customer.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_customer_without_permission()
    {
        $this->user->revokePermissionTo('store customer');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('customer.store'), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_customer()
    {
        Sanctum::actingAs($this->user);
        $this->params['name'] = $this->faker->name;
        unset($this->params['customer_role_id']);
        $response = $this->putJson(route('customer.update', $this->customer->id), $this->params);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('customers', [
            'id'   => $this->customer->id,
            'name' => $this->params['name']
        ]);
    }

    public function test_unauthenticated_user_can_update_customer()
    {
        $response = $this->putJson(route('customer.update', $this->customer->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_customer_without_permission()
    {
        $this->user->revokePermissionTo('update customer');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('customer.update', $this->customer->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_customer()
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('customer.destroy', $this->customer->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('customers', [
            'id' => $this->customer->id,
        ]);
    }

    public function test_unauthenticated_user_can_destroy_customer()
    {
        $response = $this->deleteJson(route('customer.destroy', $this->customer->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_customer_without_permission()
    {
        $this->user->revokePermissionTo('delete customer');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('customer.destroy', $this->customer->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_customers_search_list()
    {
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('customer.search'), [
            'expression' => $this->searchExpression,
            'bindings'   => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'surname', 'email', 'phone', 'gender', 'customer_role', 'city', 'district', 'neighborhood', 'address', 'comment']
            ], 'links', 'meta'
        ]);
    }

    public function test_authenticated_user_cant_get_customers_search_list_without_permission()
    {
        $this->user->revokePermissionTo('view customer');
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('customer.search'), [
            'expression' => $this->searchExpression,
            'bindings'   => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

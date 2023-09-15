<?php

namespace App\Services\Expense\Tests\Feature;

use App\Services\Expense\Database\Seeders\ExpenseTypeSeeder;
use App\Services\Expense\Models\ExpenseType;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ExpenseTypeTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    protected User $user;
    protected ExpenseType $expenseType;
    protected array $params;
    protected string $searchExpression;
    protected array $searchBindings;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->seed(ExpenseTypeSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->expenseType = ExpenseType::first();
    }

    public function setParams(): array
    {
        return [
            'name' => $this->faker->sentence(2),
        ];
    }

    public function test_authenticated_user_can_get_expense_type_list(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('expense-type.index'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name']
            ], 'links', 'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_expense_type_list(): void
    {
        $response = $this->getJson(route('expense-type.index'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_expense_type_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view expense type');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('expense-type.index'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_expense_type(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('expense-type.show', $this->expenseType->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id', 'name'
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_expense_type(): void
    {
        $response = $this->getJson(route('expense-type.show', $this->expenseType->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_expense_type_without_permission(): void
    {
        $this->user->revokePermissionTo('view expense type');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('expense-type.show', $this->expenseType->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_cant_store_expense_type_if_database_cannot_connected(): void
    {
        Sanctum::actingAs($this->user);
        DB::disconnect();
        $response = $this->postJson(route('expense-type.store'), $this->params);
        $response->assertStatus(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function test_authenticated_user_can_store_expense_type(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('expense-type.store'), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('expense_types', [
            'name' => $this->params['name'],
        ]);
    }

    public function test_authenticated_user_cant_store_expense_type_wrong_params(): void
    {
        $this->params['name'] = '';
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('expense-type.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_expense_type(): void
    {
        $response = $this->postJson(route('expense-type.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_expense_type_without_permission(): void
    {
        $this->user->revokePermissionTo('store expense type');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('expense-type.store'), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_expense_type(): void
    {
        Sanctum::actingAs($this->user);
        $this->params['name'] = $this->faker->sentence(2);
        $response = $this->putJson(route('expense-type.update', $this->expenseType->id), $this->params);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('expense_types', [
            'id' => $this->expenseType->id,
            'name' => $this->params["name"]
        ]);
    }

    public function test_unauthenticated_user_can_update_expense_type(): void
    {
        $response = $this->putJson(route('expense-type.update', $this->expenseType->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_expense_type_without_permission(): void
    {
        $this->user->revokePermissionTo('update expense type');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('expense-type.update', $this->expenseType->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_expense_type(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('expense-type.destroy', $this->expenseType->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('expense_types', [
            'id' => $this->expenseType->id,
        ]);
    }

    public function test_unauthenticated_user_can_destroy_expense_type(): void
    {
        $response = $this->deleteJson(route('expense-type.destroy', $this->expenseType->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_expense_type_without_permission(): void
    {
        $this->user->revokePermissionTo('delete expense type');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('expense-type.destroy', $this->expenseType->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_expense_type_search_list(): void
    {
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('expense-type.search'), [
            'expression' => $this->searchExpression,
            'bindings' => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name']
            ], 'links', 'meta'
        ]);
    }

    public function test_authenticated_user_cant_get_expense_type_search_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view expense type');
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('expense-type.search'), [
            'expression' => $this->searchExpression,
            'bindings' => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

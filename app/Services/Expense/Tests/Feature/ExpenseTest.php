<?php

namespace App\Services\Expense\Tests\Feature;

use App\Services\Expense\Database\Seeders\ExpenseSeeder;
use App\Services\Expense\Enums\ExpenseType;
use App\Services\Expense\Models\Expense;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use App\Services\Vault\Models\Vault;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ExpenseTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    protected User $user;
    protected Expense $expense;
    protected array $params;
    protected string $searchExpression;
    protected array $searchBindings;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->seed(ExpenseSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->expense = Expense::first();
    }

    public function setParams(): array
    {
        return array(
            'amount'       => $this->faker->numberBetween(1, 50),
            'vault_id'     => Vault::factory()->create()->id,
            'comment'      => $this->faker->sentence,
            'receipt_date' => $this->faker->dateTimeBetween('-2 month')->format('d.m.Y H:i:s'),
            'type'         => $this->faker->randomElement(ExpenseType::cases())->value,
        );
    }

    public function test_authenticated_user_can_get_expense_list(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('expense.index'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'amount', 'vault', 'receipt_date', 'comment', 'type']
            ],
            'links',
            'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_expense_list(): void
    {
        $response = $this->getJson(route('expense.index'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_expense_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view expense');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('expense.index'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_expense(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('expense.show', $this->expense->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'amount',
                'vault',
                'receipt_date',
                'comment',
                'type'
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_expense(): void
    {
        $response = $this->getJson(route('expense.show', $this->expense->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_expense_without_permission(): void
    {
        $this->user->revokePermissionTo('view expense');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('expense.show', $this->expense->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_cant_store_expense_if_database_cannot_connected(): void
    {
        Sanctum::actingAs($this->user);
        DB::disconnect();
        $response = $this->postJson(route('expense.store'), $this->params);
        $response->assertStatus(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function test_authenticated_user_can_store_expense(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('expense.store'), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('expenses', [
            'amount'       => $this->expense->amount,
            'vault_id'     => $this->expense->vault_id,
            'comment'      => $this->expense->comment,
            'receipt_date' => $this->expense->receipt_date,
        ]);
    }

    public function test_authenticated_user_cant_store_expense_wrong_params(): void
    {
        unset($this->params['amount']);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('expense.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_expense(): void
    {
        $response = $this->postJson(route('expense.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_expense_without_permission(): void
    {
        $this->user->revokePermissionTo('store expense');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('expense.store'), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_expense(): void
    {
        Sanctum::actingAs($this->user);
        $this->params['amount'] = $this->faker->numberBetween(1, 40);
        unset($this->params['vault_id']);
        $response = $this->putJson(route('expense.update', $this->expense->id), $this->params);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('expenses', [
            'id'     => $this->expense->id,
            'amount' => $this->params["amount"]
        ]);
    }

    public function test_unauthenticated_user_can_update_expense(): void
    {
        $response = $this->putJson(route('expense.update', $this->expense->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_expense_without_permission(): void
    {
        $this->user->revokePermissionTo('update expense');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('expense.update', $this->expense->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_expense(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('expense.destroy', $this->expense->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('expenses', [
            'id' => $this->expense->id,
        ]);
    }

    public function test_unauthenticated_user_can_destroy_expense(): void
    {
        $response = $this->deleteJson(route('expense.destroy', $this->expense->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_expense_without_permission(): void
    {
        $this->user->revokePermissionTo('delete expense');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('expense.destroy', $this->expense->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_expense_search_list(): void
    {
        Sanctum::actingAs($this->user);
        $this->searchExpression = "comment like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('expense.search'), [
            'expression' => $this->searchExpression,
            'bindings'   => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'amount', 'vault', 'receipt_date', 'comment', 'type']
            ],
            'links',
            'meta'
        ]);
    }

    public function test_authenticated_user_cant_get_expense_search_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view expense');
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('expense.search'), [
            'expression' => $this->searchExpression,
            'bindings'   => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

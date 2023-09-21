<?php

namespace App\Services\Staff\Tests\Feature;

use App\Services\Staff\Database\Seeders\StaffSeeder;
use App\Services\Staff\Enums\StaffType;
use App\Services\Staff\Models\Staff;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use App\Services\Vault\Models\Vault;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class StaffTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    protected User $user;
    protected Staff $staff;
    protected array $params;
    protected string $searchExpression;
    protected array $searchBindings;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->seed(StaffSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->staff = Staff::first();
    }

    public function setParams(): array
    {
        return [
            'name'            => $this->faker->name,
            'surname'         => $this->faker->lastName,
            'phone'           => $this->faker->sentence(1),
            'email'           => $this->faker->email,
            'type'            => $this->faker->randomElement(StaffType::values()),
            'salary'          => $this->faker->numberBetween(1000, 10000),
            'salary_vault_id' => Vault::factory()->create()->id
        ];
    }

    public function test_authenticated_user_can_get_staff_list(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('staff.index'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'surname', 'phone', 'email', 'salary', 'salary_vault', 'type']
            ], 'links', 'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_staff_list(): void
    {
        $response = $this->getJson(route('staff.index'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_staff_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view staff');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('staff.index'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_staff(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('staff.show', $this->staff->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id', 'name', 'surname', 'phone', 'email', 'salary', 'salary_vault', 'type'
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_staff(): void
    {
        $response = $this->getJson(route('staff.show', $this->staff->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_staff_without_permission(): void
    {
        $this->user->revokePermissionTo('view staff');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('staff.show', $this->staff->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_cant_store_staff_if_database_cannot_connected(): void
    {
        Sanctum::actingAs($this->user);
        DB::disconnect();
        $response = $this->postJson(route('staff.store'), $this->params);
        $response->assertStatus(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function test_authenticated_user_can_store_staff(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('staff.store'), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('staffs', [
            'name' => $this->params['name']
        ]);
    }

    public function test_authenticated_user_cant_store_staff_wrong_params(): void
    {
        unset($this->params['amount']);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('staff.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_staff(): void
    {
        $response = $this->postJson(route('staff.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_staff_without_permission(): void
    {
        $this->user->revokePermissionTo('store staff');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('staff.store'), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_staff(): void
    {
        Sanctum::actingAs($this->user);
        $this->params['amount'] = $this->faker->numberBetween(1, 40);
        unset($this->params['vault_id']);
        $response = $this->putJson(route('staff.update', $this->staff->id), $this->params);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('staffs', [
            'id'   => $this->staff->id,
            'name' => $this->params["name"]
        ]);
    }

    public function test_unauthenticated_user_can_update_staff(): void
    {
        $response = $this->putJson(route('staff.update', $this->staff->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_staff_without_permission(): void
    {
        $this->user->revokePermissionTo('update staff');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('staff.update', $this->staff->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_staff(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('staff.destroy', $this->staff->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('staffs', [
            'id' => $this->staff->id,
        ]);
    }

    public function test_unauthenticated_user_can_destroy_staff(): void
    {
        $response = $this->deleteJson(route('staff.destroy', $this->staff->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_staff_without_permission(): void
    {
        $this->user->revokePermissionTo('delete staff');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('staff.destroy', $this->staff->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_staff_search_list(): void
    {
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('staff.search'), [
            'expression' => $this->searchExpression,
            'bindings'   => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'surname', 'phone', 'email', 'salary', 'salary_vault', 'type']
            ], 'links', 'meta'
        ]);
    }

    public function test_authenticated_user_cant_get_staff_search_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view staff');
        Sanctum::actingAs($this->user);
        $this->searchExpression = "name like ?";
        $this->searchBindings = ['%a%'];
        $response = $this->postJson(route('staff.search'), [
            'expression' => $this->searchExpression,
            'bindings'   => $this->searchBindings
        ]);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

<?php

namespace App\Services\Vault\Tests\Feature;

use App\Services\Currency\Models\Currency;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use App\Services\Vault\Database\Seeders\VaultSeeder;
use App\Services\Vault\Models\Vault;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class VaultTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    protected User $user;
    protected Vault $vault;
    protected array $params;
    protected string $searchExpression;
    protected array $searchBindings;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->seed(VaultSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->vault = Vault::first();
    }

    public function setParams(): array
    {
        return [
            'name' => $this->faker->name,
            'currency_id' => Currency::inRandomOrder()->first()->id,
        ];
    }

    /** @test test */
    public function test_authenticated_user_can_get_vault_list(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('vault.index'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'currency']
            ],
            'links',
            'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_vault_list(): void
    {
        $response = $this->getJson(route('vault.index'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_vault_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view vault');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('vault.index'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_vault(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('vault.show', $this->vault->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'currency'
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_vault(): void
    {
        $response = $this->getJson(route('vault.show', $this->vault->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_vault_without_permission(): void
    {
        $this->user->revokePermissionTo('view vault');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('vault.show', $this->vault->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_cant_store_vault_if_database_cannot_connected(): void
    {
        Sanctum::actingAs($this->user);
        DB::disconnect();
        $response = $this->postJson(route('vault.store'), $this->params);
        $response->assertStatus(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function test_authenticated_user_can_store_vault(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('vault.store'), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('vaults', [
            'name' => $this->vault->name
        ]);
    }

    public function test_authenticated_user_cant_store_vault_wrong_params(): void
    {
        unset($this->params['name']);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('vault.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_vault()
    {
        $response = $this->postJson(route('vault.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_vault_without_permission(): void
    {
        $this->user->revokePermissionTo('store vault');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('vault.store'), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_vault(): void
    {
        Sanctum::actingAs($this->user);
        $this->params['name'] = $this->faker->name;
        unset($this->params['currency_id']);
        $response = $this->putJson(route('vault.update', $this->vault->id), $this->params);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('vaults', [
            'id' => $this->vault->id,
            'name' => $this->params['name']
        ]);
    }

    public function test_unauthenticated_user_can_update_vault(): void
    {
        $response = $this->putJson(route('vault.update', $this->vault->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_vault_without_permission(): void
    {
        $this->user->revokePermissionTo('update vault');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('vault.update', $this->vault->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_vault(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('vault.destroy', $this->vault->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('vaults', [
            'id' => $this->vault->id,
        ]);
    }

    public function test_unauthenticated_user_can_destroy_vault(): void
    {
        $response = $this->deleteJson(route('vault.destroy', $this->vault->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_vault_without_permission(): void
    {
        $this->user->revokePermissionTo('delete vault');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('vault.destroy', $this->vault->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

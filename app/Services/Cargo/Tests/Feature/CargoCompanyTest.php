<?php

namespace App\Services\Cargo\Tests\Feature;

use App\Services\Cargo\Database\Seeders\CargoCompanySeeder;
use App\Services\Cargo\Models\CargoCompany;
use App\Services\Currency\Http\Controllers\CurrencyController;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class CargoCompanyTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    protected User $user;
    protected CargoCompany $cargoCompany;
    protected array $params;

    public function setUp(): void
    {
        parent::setUp();
        (new CurrencyController)->loadCurrenciesFromTCMB();
        $this->seed(UserSeeder::class);
        $this->seed(CargoCompanySeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->cargoCompany = CargoCompany::first();
    }

    public function setParams(): array
    {
        return array(
            'name' => $this->faker->company,
        );
    }

    public function test_authenticated_user_can_get_cargo_company_list(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('cargo-company.index'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'photo_path']
            ],
            'links',
            'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_cargo_company_list(): void
    {
        $response = $this->getJson(route('cargo-company.index'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_cargo_company_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view cargo company');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('cargo-company.index'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_cargo_company(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('cargo-company.show', $this->cargoCompany->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'photo_path'
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_cargo_company(): void
    {
        $response = $this->getJson(route('cargo-company.show', $this->cargoCompany->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_cargo_company_without_permission(): void
    {
        $this->user->revokePermissionTo('view cargo company');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('cargo-company.show', $this->cargoCompany->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_cant_store_cargo_company_if_database_cannot_connected(): void
    {
        Sanctum::actingAs($this->user);
        DB::disconnect();
        $response = $this->postJson(route('cargo-company.store'), $this->params);
        $response->assertStatus(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function test_authenticated_user_can_store_cargo_company(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('cargo-company.store'), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('cargo_companies', [
            'name' => $this->params['name']
        ]);
    }

    public function test_authenticated_user_cant_store_cargo_company_wrong_params(): void
    {
        unset($this->params['name']);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('cargo-company.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_cargo(): void
    {
        $response = $this->postJson(route('cargo.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_cargo_company_without_permission(): void
    {
        $this->user->revokePermissionTo('store cargo company');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('cargo-company.store'), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_cargo_company(): void
    {
        Sanctum::actingAs($this->user);
        $this->params['name'] = $this->faker->company;
        $response = $this->putJson(route('cargo-company.update', $this->cargoCompany->id), $this->params);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('cargo_companies', [
            'id' => $this->cargoCompany->id,
            'name' => $this->params["name"]
        ]);
    }

    public function test_unauthenticated_user_can_update_cargo_company(): void
    {
        $response = $this->putJson(route('cargo.update', $this->cargoCompany->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_cargo_company_without_permission(): void
    {
        $this->user->revokePermissionTo('update cargo company');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('cargo-company.update', $this->cargoCompany->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_cargo_company(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('cargo-company.destroy', $this->cargoCompany->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('cargo_companies', [
            'id' => $this->cargoCompany->id,
        ]);
    }

    public function test_unauthenticated_user_can_destroy_cargo_company(): void
    {
        $response = $this->deleteJson(route('cargo-company.destroy', $this->cargoCompany->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_cargo_company_without_permission(): void
    {
        $this->user->revokePermissionTo('delete cargo company');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('cargo-company.destroy', $this->cargoCompany->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

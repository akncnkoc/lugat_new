<?php

namespace App\Services\Cargo\Tests\Feature;

use App\Services\Cargo\Database\Seeders\CargoSeeder;
use App\Services\Cargo\Enums\AmountType;
use App\Services\Cargo\Enums\CargoType;
use App\Services\Cargo\Models\Cargo;
use App\Services\Cargo\Models\CargoCompany;
use App\Services\Currency\Http\Controllers\CurrencyController;
use App\Services\Currency\Models\Currency;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class CargoTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    protected User $user;
    protected Cargo $cargo;
    protected array $params;

    public function setUp(): void
    {
        parent::setUp();
        (new CurrencyController)->loadCurrenciesFromTCMB();
        $this->seed(UserSeeder::class);
        $this->seed(CargoSeeder::class);
        $this->params = $this->setParams();
        $this->user = User::first();
        $this->cargo = Cargo::first();
    }

    public function setParams(): array
    {
        return array(
            'cargo_company_id' => CargoCompany::factory()->create()->id,
            'type' => $this->faker->randomElement(CargoType::values()),
            'tracking_no' => $this->faker->uuid,
            'amount_type' => $this->faker->randomElement(AmountType::values()),
            'price' => $this->faker->numberBetween(100, 500),
            'price_currency_id' => Currency::inRandomOrder()->first()->id,
            'date_of_paid' => Carbon::now()
        );
    }

    public function test_authenticated_user_can_get_cargo_list(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('cargo.index'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'cargo_company', 'type', 'amount_type', 'tracking_no', 'price', 'price_currency', 'date_of_paid']
            ],
            'links',
            'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_cargo_list(): void
    {
        $response = $this->getJson(route('cargo.index'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_cargo_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view cargo');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('cargo.index'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_cargo(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('cargo.show', $this->cargo->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'cargo_company',
                'type',
                'amount_type',
                'tracking_no',
                'price',
                'price_currency',
                'date_of_paid'
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_cargo(): void
    {
        $response = $this->getJson(route('cargo.show', $this->cargo->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_cargo_without_permission(): void
    {
        $this->user->revokePermissionTo('view cargo');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('cargo.show', $this->cargo->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_cant_store_cargo_if_database_cannot_connected(): void
    {
        Sanctum::actingAs($this->user);
        DB::disconnect();
        $response = $this->postJson(route('cargo.store'), $this->params);
        $response->assertStatus(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function test_authenticated_user_can_store_cargo(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('cargo.store'), $this->params);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('cargos', [
            'price' => $this->params['price']
        ]);
    }

    public function test_authenticated_user_cant_store_cargo_wrong_params(): void
    {
        unset($this->params['cargo_company_id']);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('cargo.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_cargo(): void
    {
        $response = $this->postJson(route('cargo.store'), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_cargo_without_permission(): void
    {
        $this->user->revokePermissionTo('store cargo');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('cargo.store'), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_cargo(): void
    {
        Sanctum::actingAs($this->user);
        $this->params['price'] = $this->faker->numberBetween(100, 500);
        $response = $this->putJson(route('cargo.update', $this->cargo->id), $this->params);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('cargos', [
            'id' => $this->cargo->id,
            'price' => $this->params['price']
        ]);
    }

    public function test_unauthenticated_user_can_update_cargo(): void
    {
        $response = $this->putJson(route('cargo.update', $this->cargo->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_cargo_without_permission(): void
    {
        $this->user->revokePermissionTo('update cargo');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('cargo.update', $this->cargo->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_cargo(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('cargo.destroy', $this->cargo->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('cargos', [
            'id' => $this->cargo->id,
        ]);
    }

    public function test_unauthenticated_user_can_destroy_cargo(): void
    {
        $response = $this->deleteJson(route('cargo.destroy', $this->cargo->id), $this->params);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_cargo_without_permission(): void
    {
        $this->user->revokePermissionTo('delete cargo');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('cargo.destroy', $this->cargo->id), $this->params);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

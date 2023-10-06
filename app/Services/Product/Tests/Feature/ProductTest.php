<?php

namespace App\Services\Product\Tests\Feature;

use App\Services\Currency\Models\Currency;
use App\Services\Invoice\Traits\TaxType;
use App\Services\Product\Database\Seeders\ProductSeeder;
use App\Services\Product\Models\Product;
use App\Services\Product\Models\SubProduct;
use App\Services\Product\Models\SubProductImage;
use App\Services\Product\Models\SubProductVariant;
use App\Services\Product\Models\Variant;
use App\Services\Supplier\Database\Seeders\SupplierSeeder;
use App\Services\Supplier\Models\Supplier;
use App\Services\User\Database\Seeders\UserSeeder;
use App\Services\User\Models\User;
use App\Services\Vault\Database\Seeders\VaultSeeder;
use App\Services\Vault\Models\Vault;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    public Collection $vaults;
    protected User $user;
    protected Product $product;
    protected array $createParams;
    protected array $updateParams;
    protected string $searchExpression;
    protected array $searchBindings;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(VaultSeeder::class);
        $this->seed(SupplierSeeder::class);
        $this->seed(UserSeeder::class);
        $this->seed(ProductSeeder::class);
        $this->user = User::first();
        $this->product = Product::first();
        $this->vaults = Vault::all();
        $this->createParams = $this->setCreateParams();
        $this->updateParams = $this->setUpdateParams();
    }

    public function setCreateParams(): array
    {
        $product_name = $this->faker->name;
        $buy_price = $this->faker->numberBetween(100, 500);
        $variants = Variant::inRandomOrder()->get();
        $suppliers = Supplier::inRandomOrder()->get();
        $sell_price = ($buy_price) - ($buy_price * .3);
        $currency = Currency::inRandomOrder()->first();
        return [
            'name'         => $product_name,
            'sub_products' => [
                [
                    'name'             => $product_name." Variant",
                    'sku'       => $this->faker->postcode,
                    'barcode'       => $this->faker->postcode,
                    'buy_price'        => $buy_price,
                    'sell_price'       => $sell_price,
                    'buy_currency_id'  => $currency->id,
                    'sell_currency_id' => $currency->id,
                    'stock'            => $this->faker->numberBetween(1, 10),
                    'tax'              => $this->faker->randomElement(TaxType::values()),
                    'variants'         => [
                        $variants[0]->id,
                        $variants[1]->id,
                        $variants[2]->id,
                    ],
                    //                'images'           => [
                    //                    UploadedFile::fake()->create('image.png', 50, 'png'),
                    //                    UploadedFile::fake()->create('image2.png', 10, 'png'),
                    //                ]
                ]
            ],
            'suppliers'    => [
                $suppliers[0]->id,
                $suppliers[1]->id,
            ]
        ];
    }

    public function setUpdateParams(): array
    {
        return [
            'name' => $this->faker->name
        ];
    }

    public function test_authenticated_user_can_get_product_list(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('product.index'));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'sub_products',
                    'suppliers' => [
                        '*' => ['name', 'email', 'phone']
                    ]
                ]
            ],
            'links',
            'meta'
        ]);
    }

    public function test_unauthorized_user_cant_get_product_list(): void
    {
        $response = $this->getJson(route('product.index'));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_product_list_without_permission(): void
    {
        $this->user->revokePermissionTo('view product');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('product.index'));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_get_product(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('product.show', $this->product->id));
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'sub_products',
                'suppliers' => [
                    '*' => ['name', 'email', 'phone']
                ]
            ]
        ]);
    }

    public function test_unauthorized_user_cant_get_product(): void
    {
        $response = $this->getJson(route('product.show', $this->product->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authorized_user_cant_get_product_without_permission(): void
    {
        $this->user->revokePermissionTo('view product');
        Sanctum::actingAs($this->user);
        $response = $this->getJson(route('product.show', $this->product->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_cant_store_product_if_database_cannot_connected(): void
    {
        Sanctum::actingAs($this->user);
        DB::disconnect();
        $response = $this->postJson(route('product.store'), $this->createParams);
        $response->assertStatus(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function test_authenticated_user_can_store_product(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('product.store'), $this->createParams);
        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('products', [
            'name' => $this->createParams['name']
        ]);
        $this->assertDatabaseHas('sub_products', [
            'name'  => $this->createParams['sub_products'][0]['name'],
            'stock' => $this->createParams['sub_products'][0]['stock'],
        ]);
        $this->assertDatabaseHas('sub_product_variants', [
            'variant_id' => $this->createParams['sub_products'][0]['variants'][0],
        ]);
        $this->assertDatabaseHas('product_suppliers', [
            'supplier_id' => $this->createParams['suppliers'][0],
        ]);
    }


    public function test_authenticated_user_cant_store_product_wrong_params(): void
    {
        unset($this->createParams['name']);
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('product.store'), $this->createParams);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_unauthenticated_user_can_store_product(): void
    {
        $response = $this->postJson(route('product.store'), $this->createParams);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_store_product_without_permission(): void
    {
        $this->user->revokePermissionTo('store product');
        Sanctum::actingAs($this->user);
        $response = $this->postJson(route('product.store'), $this->createParams);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }


    public function test_authenticated_user_can_update_product(): void
    {
        Sanctum::actingAs($this->user);
        $this->createParams['name'] = $this->faker->name;
        $response = $this->putJson(route('product.update', $this->product->id), $this->updateParams);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('products', [
            'id'   => $this->product->id,
            'name' => $this->updateParams['name']
        ]);
    }

    public function test_unauthenticated_user_can_update_product(): void
    {
        $response = $this->putJson(route('product.update', $this->product->id), $this->updateParams);
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_update_product_without_permission(): void
    {
        $this->user->revokePermissionTo('update product');
        Sanctum::actingAs($this->user);
        $response = $this->putJson(route('product.update', $this->product->id), $this->updateParams);
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_authenticated_user_can_destroy_product(): void
    {
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('product.destroy', $this->product->id));
        $response->assertStatus(Response::HTTP_OK);
        $this->assertSoftDeleted('products', [
            'id' => $this->product->id,
        ]);
        $this->product->subProducts()->each(function (SubProduct $subProduct) {
            $this->assertSoftDeleted('sub_products', [
                'id' => $subProduct->id
            ]);
            $subProduct->subProductVariants()->each(function (SubProductVariant $subProductVariant) {
                $this->assertSoftDeleted('sub_product_variants', [
                    'id' => $subProductVariant->id
                ]);
            });
            $subProduct->subProductImages()->each(function (SubProductImage $subProductImage) {
                $this->assertSoftDeleted('sub_product_images', [
                    'id' => $subProductImage->id
                ]);
            });
        });
    }

    public function test_unauthenticated_user_can_destroy_product(): void
    {
        $response = $this->deleteJson(route('product.destroy', $this->product->id));
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function test_authenticated_user_cant_destroy_product_without_permission(): void
    {
        $this->user->revokePermissionTo('delete product');
        Sanctum::actingAs($this->user);
        $response = $this->deleteJson(route('product.destroy', $this->product->id));
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}

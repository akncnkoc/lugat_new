<?php

namespace App\Services\Product\Http\Controllers;


use App\Global\Http\Controllers\Controller;
use App\Global\Traits\ResponseTrait;
use App\Services\Product\Http\Requests\ProductSupplierStoreRequest;
use App\Services\Product\Models\Product;
use App\Services\Product\Models\ProductSupplier;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ProductSupplierController extends Controller
{


    public function store(ProductSupplierStoreRequest $request, Product $product): ?JsonResponse
    {
        $this->authorize('productSupplierStore', ProductSupplier::class);
        DB::transaction(static function () use ($product, $request) {
            foreach ($request->get('suppliers') as  $suppliers) {
                $product->productSuppliers()->create([
                    'supplier_id' => $suppliers['supplier_id']
                ]);
            }
        });
        return $this->success('product supplier added', statusCode: Response::HTTP_CREATED);
    }

    public function destroy(ProductSupplier $productSupplier, Product $product): ?JsonResponse
    {
        $this->authorize('productSupplierDelete', ProductSupplier::class);
        DB::transaction(static function () use ($productSupplier, $product) {
            if ($productSupplier->product_id === $product->id) {
                $productSupplier->delete();
            }
        });
        return $this->success('product supplier deleted');
    }
}

<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Services\Auth\Models{
/**
 * App\Services\Auth\Models\PersonalAccessToken
 *
 * @property string $id
 * @property string $tokenable_type
 * @property string $tokenable_id
 * @property string $name
 * @property string $token
 * @property array|null $abilities
 * @property \Illuminate\Support\Carbon|null $last_used_at
 * @property \Illuminate\Support\Carbon|null $expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $tokenable
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken query()
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereAbilities($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereLastUsedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereTokenableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereTokenableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	class PersonalAccessToken extends \Eloquent {}
}

namespace App\Services\Cargo\Models{
/**
 * App\Services\Cargo\Models\Cargo
 *
 * @property string $id
 * @property string $cargo_company_id
 * @property \App\Services\Cargo\Enums\CargoType $type
 * @property string|null $tracking_no
 * @property string|null $amount
 * @property \App\Services\Cargo\Enums\AmountType $amount_type
 * @property string $price
 * @property string|null $price_currency_id
 * @property \Illuminate\Support\Carbon|null $ready_to_ship_date
 * @property \Illuminate\Support\Carbon|null $shipped_date
 * @property \Illuminate\Support\Carbon|null $delivered_date
 * @property \Illuminate\Support\Carbon|null $returned_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Services\Cargo\Models\CargoCompany $cargoCompany
 * @property-read \App\Services\Currency\Models\Currency|null $priceCurrency
 * @method static \App\Services\Cargo\Database\Factories\CargoFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo query()
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereAmountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereCargoCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereDeliveredDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo wherePriceCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereReadyToShipDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereReturnedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereShippedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereTrackingNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Cargo withoutTrashed()
 */
	class Cargo extends \Eloquent {}
}

namespace App\Services\Cargo\Models{
/**
 * App\Services\Cargo\Models\CargoCompany
 *
 * @property string $id
 * @property string $name
 * @property string|null $photo_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \App\Services\Cargo\Database\Factories\CargoCompanyFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany query()
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany wherePhotoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CargoCompany withoutTrashed()
 */
	class CargoCompany extends \Eloquent {}
}

namespace App\Services\Currency\Models{
/**
 * App\Services\Currency\Models\Currency
 *
 * @property string $id
 * @property string $name
 * @property int $unit
 * @property string $code
 * @property string $forex_buy
 * @property string $forex_sell
 * @property string $banknote_buy
 * @property string $banknote_sell
 * @property bool $primary
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \App\Services\Currency\Database\Factories\CurrencyFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Currency newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Currency newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Currency query()
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereBanknoteBuy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereBanknoteSell($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereForexBuy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereForexSell($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency wherePrimary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereUpdatedAt($value)
 */
	class Currency extends \Eloquent {}
}

namespace App\Services\Customer\Models{
/**
 * App\Services\Customer\Models\Customer
 *
 * @property string $id
 * @property string $name
 * @property string $surname
 * @property string $email
 * @property string $phone
 * @property string|null $city
 * @property string|null $district
 * @property string|null $neighborhood
 * @property string|null $address
 * @property string|null $post_code
 * @property string|null $comment
 * @property int $gender
 * @property string $customer_type_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Services\Customer\Models\CustomerType $customerType
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Invoice\Models\InvoiceProduct> $invoiceProducts
 * @property-read int|null $invoice_products_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Invoice\Models\Invoice> $invoices
 * @property-read int|null $invoices_count
 * @method static \App\Services\Customer\Database\Factories\CustomerFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer query()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCustomerTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereDistrict($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereNeighborhood($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePostCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereSurname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer withoutTrashed()
 */
	class Customer extends \Eloquent {}
}

namespace App\Services\Customer\Models{
/**
 * App\Services\Customer\Models\CustomerType
 *
 * @property string $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \App\Services\Customer\Database\Factories\CustomerTypeFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType query()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerType withoutTrashed()
 */
}

namespace App\Services\Expense\Models{
/**
 * App\Services\Expense\Models\Expense
 *
 * @property string $id
 * @property \App\Services\Expense\Enums\ExpenseType $type
 * @property string $amount
 * @property string $currency_id
 * @property string|null $comment
 * @property string|null $receipt_date
 * @property string|null $scheduled_date
 * @property \App\Services\Expense\Enums\ExpenseStatus $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Activitylog\Models\Activity> $activities
 * @property-read int|null $activities_count
 * @property-read \App\Services\Currency\Models\Currency $currency
 * @method static \App\Services\Expense\Database\Factories\ExpenseFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Expense newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense query()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereReceiptDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereScheduledDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense withoutTrashed()
 */
	class Expense extends \Eloquent {}
}

namespace App\Services\Invoice\Models{
/**
 * App\Services\Invoice\Models\Invoice
 *
 * @property string $id
 * @property string $customer_id
 * @property string|null $bill_date
 * @property string|null $due_date
 * @property string $total_amount
 * @property string $total_tax
 * @property string $total_discount
 * @property string $total
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Services\Customer\Models\Customer $customer
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Invoice\Models\InvoiceProduct> $invoiceProducts
 * @property-read int|null $invoice_products_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Product\Models\SubProduct> $subProducts
 * @property-read int|null $sub_products_count
 * @method static \App\Services\Invoice\Database\Factories\InvoiceFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice query()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereBillDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereTotalDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereTotalTax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice withoutTrashed()
 */
	class Invoice extends \Eloquent {}
}

namespace App\Services\Invoice\Models{
/**
 * App\Services\Invoice\Models\InvoiceProduct
 *
 * @property string $id
 * @property string $invoice_id
 * @property string $sub_product_id
 * @property string $price
 * @property string $price_currency_id
 * @property string $tax
 * @property string $tax_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \App\Services\Invoice\Database\Factories\InvoiceProductFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct query()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct wherePriceCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct whereSubProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct whereTax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct whereTaxPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceProduct whereUpdatedAt($value)
 */
	class InvoiceProduct extends \Eloquent {}
}

namespace App\Services\Product\Models{
/**
 * App\Services\Product\Models\Product
 *
 * @property string $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Product\Models\SubProductImage> $productImages
 * @property-read int|null $product_images_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Product\Models\ProductSupplier> $productSuppliers
 * @property-read int|null $product_suppliers_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Product\Models\SubProduct> $subProducts
 * @property-read int|null $sub_products_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Supplier\Models\Supplier> $suppliers
 * @property-read int|null $suppliers_count
 * @method static \App\Services\Product\Database\Factories\ProductFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Product newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Product newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Product onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Product query()
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Product withoutTrashed()
 */
	class Product extends \Eloquent {}
}

namespace App\Services\Product\Models{
/**
 * App\Services\Product\Models\ProductSupplier
 *
 * @property string $id
 * @property string $product_id
 * @property string $supplier_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \App\Services\Product\Database\Factories\ProductSupplierFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSupplier newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSupplier newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSupplier query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSupplier whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSupplier whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSupplier whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSupplier whereSupplierId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSupplier whereUpdatedAt($value)
 */
	class ProductSupplier extends \Eloquent {}
}

namespace App\Services\Product\Models{
/**
 * App\Services\Product\Models\SubProduct
 *
 * @property string $id
 * @property string $name
 * @property string|null $sku
 * @property string|null $barcode
 * @property string $buy_price
 * @property string $sell_price
 * @property string|null $buy_currency_id
 * @property string $sell_currency_id
 * @property string $product_id
 * @property string $stock
 * @property \App\Services\Invoice\Traits\TaxType $tax
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Services\Currency\Models\Currency|null $buyCurrency
 * @property-read \App\Services\Product\Models\Product $product
 * @property-read \App\Services\Currency\Models\Currency $sellCurrency
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Product\Models\SubProductImage> $subProductImages
 * @property-read int|null $sub_product_images_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Product\Models\SubProductVariant> $subProductVariants
 * @property-read int|null $sub_product_variants_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Product\Models\Variant> $variants
 * @property-read int|null $variants_count
 * @method static \App\Services\Product\Database\Factories\SubProductFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereBarcode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereBuyCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereBuyPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereSellCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereSellPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereSku($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereTax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProduct withoutTrashed()
 */
	class SubProduct extends \Eloquent {}
}

namespace App\Services\Product\Models{
/**
 * App\Services\Product\Models\SubProductImage
 *
 * @property string $id
 * @property string $sub_product_id
 * @property string $path
 * @property mixed $properties
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Services\Product\Models\Product $product
 * @method static \App\Services\Product\Database\Factories\SubProductImageFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage whereProperties($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage whereSubProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductImage withoutTrashed()
 */
	class SubProductImage extends \Eloquent {}
}

namespace App\Services\Product\Models{
/**
 * App\Services\Product\Models\SubProductVariant
 *
 * @property string $id
 * @property string $sub_product_id
 * @property string $variant_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Services\Product\Models\SubProduct $subProduct
 * @method static \App\Services\Product\Database\Factories\SubProductVariantFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductVariant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductVariant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductVariant onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductVariant query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductVariant whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductVariant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductVariant whereSubProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductVariant whereVariantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductVariant withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|SubProductVariant withoutTrashed()
 */
	class SubProductVariant extends \Eloquent {}
}

namespace App\Services\Product\Models{
/**
 * App\Services\Product\Models\Variant
 *
 * @property string $id
 * @property string $name
 * @property string|null $parent_id
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Variant> $subVariants
 * @property-read int|null $sub_variants_count
 * @method static \App\Services\Product\Database\Factories\VariantFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Variant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Variant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Variant query()
 * @method static \Illuminate\Database\Eloquent\Builder|Variant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Variant whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Variant whereParentId($value)
 */
	class Variant extends \Eloquent {}
}

namespace App\Services\Staff\Models{
/**
 * App\Services\Staff\Models\Staff
 *
 * @property string $id
 * @property string $name
 * @property string $surname
 * @property string|null $phone
 * @property string|null $email
 * @property string $salary
 * @property string|null $salary_currency_id
 * @property \App\Services\Staff\Enums\StaffType $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Services\Currency\Models\Currency|null $salaryCurrency
 * @method static \App\Services\Staff\Database\Factories\StaffFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Staff newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Staff newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Staff onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Staff query()
 * @method static \Illuminate\Database\Eloquent\Builder|Staff whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Staff whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Staff whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Staff whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Staff whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Staff wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Staff whereSalary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Staff whereSalaryCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Staff whereSurname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Staff whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Staff whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Staff withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Staff withoutTrashed()
 */
	class Staff extends \Eloquent {}
}

namespace App\Services\Supplier\Models{
/**
 * App\Services\Supplier\Models\Supplier
 *
 * @property string $id
 * @property string $name
 * @property string|null $email
 * @property string|null $phone
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \App\Services\Supplier\Database\Factories\SupplierFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier query()
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier withoutTrashed()
 */
	class Supplier extends \Eloquent {}
}

namespace App\Services\User\Models{
/**
 * App\Services\User\Models\Permission
 *
 * @property string $id
 * @property string $name
 * @property string $guard_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $type
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\User\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\User\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Permission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission query()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission role($roles, $guard = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereGuardName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereUpdatedAt($value)
 */
	class Permission extends \Eloquent {}
}

namespace App\Services\User\Models{
/**
 * App\Services\User\Models\Role
 *
 * @property string $id
 * @property string $name
 * @property string $guard_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\User\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\User\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereGuardName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereUpdatedAt($value)
 */
	class Role extends \Eloquent {}
}

namespace App\Services\User\Models{
/**
 * App\Services\User\Models\User
 *
 * @property string $id
 * @property string|null $name
 * @property string|null $surname
 * @property string $email
 * @property string|null $phone
 * @property string|null $username
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property mixed $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\User\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\User\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Services\Auth\Models\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \App\Services\User\Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|User permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User role($roles, $guard = null)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereSurname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|User withoutTrashed()
 */
	class User extends \Eloquent {}
}

namespace App\Services\User\Models{
/**
 * App\Services\User\Models\UserRole
 *
 * @property string $id
 * @property int $user_id
 * @property int $role_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \App\Services\User\Database\Factories\UserRoleFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole whereUserId($value)
 */
	class UserRole extends \Eloquent {}
}

namespace App\Services\Vault\Models{
/**
 * App\Services\Vault\Models\Vault
 *
 * @property string $id
 * @property string $name
 * @property string $currency_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Services\Currency\Models\Currency $currency
 * @method static \App\Services\Vault\Database\Factories\VaultFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Vault newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vault newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vault onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Vault query()
 * @method static \Illuminate\Database\Eloquent\Builder|Vault whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vault whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vault whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vault whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vault whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vault whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vault withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Vault withoutTrashed()
 */
	class Vault extends \Eloquent {}
}


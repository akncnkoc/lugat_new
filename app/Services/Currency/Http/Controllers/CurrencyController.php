<?php

namespace App\Services\Currency\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Global\Traits\ResponseTrait;
use App\Services\Currency\Http\Resources\CurrencyResource;
use App\Services\Currency\Models\Currency;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CurrencyController extends Controller
{
    use ResponseTrait;

    public function index(): AnonymousResourceCollection
    {
        return CurrencyResource::collection(Currency::all());
    }

    public function updatePrimaryCurrency(Currency $currency): JsonResponse
    {
        DB::transaction(static function () use ($currency) {
            DB::table('currencies')->update(['primary' => false]);

            $currency->update(['primary' => true]);
        });
        return $this->success('currency updated primary');
    }

    public function loadCurrenciesFromTCMB(): ?JsonResponse
    {
//        $response = Http::get('https://www.tcmb.gov.tr/kurlar/today.xml');
        $xml = simplexml_load_string(File::get(storage_path('app/currency-data.xml')));

        $currencyConverted = [
            [
                'unit'          => 1,
                'name'          => 'Türk Lirası',
                'code'          => 'TRY',
                'forex_buy'     => 1,
                'forex_sell'    => 1,
                'banknote_buy'  => 1,
                'banknote_sell' => 1
            ]
        ];
        foreach ($xml->children() as $currency) {
            $currencyConverted[] = [
                'unit'          => $currency->Unit,
                'name'          => $currency->Isim,
                'code'          => $currency->attributes()->CurrencyCode,
                'forex_buy'     => $currency->ForexBuying == '' ? 1 : $currency->ForexBuying,
                'forex_sell'    => $currency->ForexSelling == '' ? 1 : $currency->ForexSelling,
                'banknote_buy'  => $currency->BanknoteBuying == '' ? 1 : $currency->BanknoteBuying,
                'banknote_sell' => $currency->BanknoteSelling == '' ? 1 : $currency->BanknoteSelling
            ];
        }
        DB::transaction(static function () use ($currencyConverted) {
            Currency::upsert($currencyConverted, 'code');
        });
        return $this->success("currencies updated");
    }
}

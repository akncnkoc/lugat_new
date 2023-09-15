<?php

namespace App\Services\Currency\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\Currency\Http\Resources\CurrencyResource;
use App\Services\Currency\Models\Currency;
use App\Traits\ResponseTrait;
use Exception;
use Illuminate\Support\Facades\DB;

class CurrencyController extends Controller
{
    use ResponseTrait;


    public function index()
    {
        return CurrencyResource::collection(Currency::all());
    }

    public function updatePrimaryCurrency(Currency $currency)
    {
        try {
            DB::beginTransaction();
            DB::table('currencies')->update(['primary' => false]);
            $currency->update(['primary' => true]);
            DB::commit();
            return $this->success('currency updated primary');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error('internal error');
        }
    }

    public function loadCurrenciesFromTCMB()
    {
        try {
            $xml = simplexml_load_file("https://www.tcmb.gov.tr/kurlar/today.xml");
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
                    'forex_buy'     => $currency->ForexBuying ?? 1,
                    'forex_sell'    => $currency->ForexSelling ?? 1,
                    'banknote_buy'  => $currency->BanknoteBuying ?? 1,
                    'banknote_sell' => $currency->BanknoteSelling ?? 1
                ];
            }
            DB::beginTransaction();
            Currency::updateOrCreate($currencyConverted);
            DB::commit();
            return $this->success("currencies updated");
        } catch (Exception $e) {
            DB::rollBack();
            return $this->error("internal server error");
        }
    }
}

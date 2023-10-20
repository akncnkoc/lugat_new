<?php

namespace App\Services\Setting\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Services\Currency\Models\Currency;
use App\Services\Setting\Http\Requests\GeneralSettingStoreRequest;
use App\Services\Setting\Models\GeneralSettings;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SettingController extends Controller
{

    public function index(): JsonResponse
    {
        $settigs = app(GeneralSettings::class)->toArray();
        $settigs['defaultCurrency'] = Currency::find($settigs['defaultCurrency']);
        return $this->success('settings listed', data: $settigs);
    }

    public function store(GeneralSettingStoreRequest $request, GeneralSettings $settings): JsonResponse
    {
        try {
            DB::transaction(function () use ($request, $settings) {
                foreach ($request->safe()->all() as $itemKey => $itemValue) {
                    $settings->$itemKey = $itemValue;
                }
                $settings->save();
            });
            return $this->success('stored', data: $settings->toArray());
        } catch (Exception) {
            return $this->error('cant stored');
        }
    }
}

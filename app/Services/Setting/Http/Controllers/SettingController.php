<?php

namespace App\Services\Setting\Http\Controllers;

use App\Global\Http\Controllers\Controller;
use App\Services\Setting\Http\Requests\GeneralSettingStoreRequest;
use App\Services\Setting\Models\GeneralSettings;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{

    public function index(): JsonResponse
    {
        return $this->success('settings listed', data: app(GeneralSettings::class)->toArray());
    }

    public function store(GeneralSettingStoreRequest $request, GeneralSettings $settings): JsonResponse
    {
        try {
            DB::transaction(function () use ($request, $settings) {
                foreach ($request->safe()->all() as $itemKey => $itemValue) {
                    $settings->$$itemKey = $itemValue;
                }
                app(GeneralSettings::class)->save();
            });
            return $this->success('stored');
        } catch (Exception) {
            return $this->error('cant stored');
        }
    }
}

<?php

namespace App\Services\Setting\Models;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $name;
    public string $defaultCurrency;
    public string $timezone;
    public string $dateFormat;
    public string $companyName;
    public string $companyVatNumber;
    public string $companyAddress;
    public string $companyPostCode;
    public string $companyContactPhoneNumber;
    public string $companyContactEmail;
    public string $companyWebsite;

    public static function group(): string
    {
        return 'general';
    }
}

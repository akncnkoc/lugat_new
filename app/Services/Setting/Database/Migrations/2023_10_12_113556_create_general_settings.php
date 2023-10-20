<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('general.name', 'Lügat');
        $this->migrator->add('general.defaultCurrency', '');
        $this->migrator->add('general.timezone', 'Europe/Istanbul');
        $this->migrator->add('general.dateFormat', 'd/m/Y H:i:s');
        $this->migrator->add('general.companyName', '');
        $this->migrator->add('general.companyVatNumber', '');
        $this->migrator->add('general.companyAddress', '');
        $this->migrator->add('general.companyPostCode', '');
        $this->migrator->add('general.companyContactPhoneNumber', '');
        $this->migrator->add('general.companyContactEmail', '');
        $this->migrator->add('general.companyWebsite', '');
        $this->migrator->add('general.is_company_registerd', false);
    }
};

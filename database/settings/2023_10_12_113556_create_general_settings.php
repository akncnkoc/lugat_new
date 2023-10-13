<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.name', '');
        $this->migrator->add('general.default_currency', '');
        $this->migrator->add('general.timezone', 'Europe/Istanbul');
        $this->migrator->add('general.dateformat', 'd.m.Y');
        $this->migrator->add('general.company_name', '');
        $this->migrator->add('general.company_vat_number', '');
        $this->migrator->add('general.company_address', '');
        $this->migrator->add('general.company_post_code', '');
        $this->migrator->add('general.company_contact_phone_number', '');
        $this->migrator->add('general.company_contact_email', '');
        $this->migrator->add('general.company_website', '');
    }
};

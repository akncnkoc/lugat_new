<?php

namespace App\Services\Auth\Enums;

enum UserTokenAbility: string
{
    case ISSUE_ACCESS_TOKEN = 'issue-access-token';
    case ACCESS_API = 'access-api';
}

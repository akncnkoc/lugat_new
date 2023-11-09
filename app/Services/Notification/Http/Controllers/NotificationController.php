<?php

namespace App\Services\Notification\Http\Controllers;

use App\Global\Http\Controllers\Controller;



class NotificationController extends Controller
{
    public function index()
    {
        return auth()->user()->unreadNotifications()->get()->toArray();
    }
}

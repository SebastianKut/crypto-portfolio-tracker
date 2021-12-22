<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function update(User $user, Request $request)
    {
        $user->setting->update(Setting::validateData($request));

        return back();
    }
}

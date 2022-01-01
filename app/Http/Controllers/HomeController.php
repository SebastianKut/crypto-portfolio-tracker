<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function dashboard($currency)
    {
        $data = $this->getData($currency);

        return Inertia::render('Pages-dashboard/Dashboard', [
            'marketData'    => $data['marketData'],
            'exchangeRates' => $data['exchangeRates'],
            'indicators'    => $data['indicators'] ? $data['indicators'] : (object)[],
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Support\CoinGecko\CoinGecko;
use App\Support\ExchangeRate\ExchangeRate;
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
            'indicators'    => $data['indicators'],
        ]);
    }
}

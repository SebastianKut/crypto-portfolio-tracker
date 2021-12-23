<?php

namespace App\Http\Controllers;

use App\Support\CoinGecko\CoinGecko;
use App\Support\ExchangeRate\ExchangeRate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function dashboard($currency)
    {
        $tokens = auth()->user()->transactions->pluck('token_identifier')->toArray();

        $marketData = CoinGecko::fetchMarketData($currency, $tokens);

        $exchangeRates = ExchangeRate::fetchExchangeRates($currency);

        return Inertia::render('Pages-dashboard/Dashboard', [
            'marketData'    => $marketData,
            'exchangeRates' => $exchangeRates,
        ]);
    }
}

<?php

namespace App\Support\CoinGecko;

use Illuminate\Support\Facades\Http;

class CoinGecko
{
    public static function fetchMarketData(string $currency, array $tokens)
    {
        $requestURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' . $currency . '&ids=' . implode("%2C%20", $tokens) . '&order=market_cap_desc&per_page=100&page=1&sparkline=false';

        $response = Http::get($requestURL);

        $result = [
            'base_currency'     => $currency,
            'data'              => json_decode($response->body()),
        ];

        return $result;
    }

    public static function fetchPrices(array $currencies, $tokens)
    {
        $requestURL = 'https://api.coingecko.com/api/v3/simple/price?ids=' . implode('%2C', $tokens) . '&vs_currencies=' . implode('%2C', $currencies);

        $response = Http::get($requestURL);

        return json_decode($response->body());
    }
}

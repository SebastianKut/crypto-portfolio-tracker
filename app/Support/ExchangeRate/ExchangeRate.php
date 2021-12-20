<?php

namespace App\Support\ExchangeRate;

use Illuminate\Support\Facades\Http;

class ExchangeRate
{
    public static function fetchExchangeRates(string $baseCurrency,)
    {
        $requestURL = 'https://api.exchangerate.host/latest?base=' . $baseCurrency . '&symbols=usd,aud,cad,chf,czk,eur,gbp,hkd,jpy,nzd,pln,rub';

        $response = Http::get($requestURL);

        return json_decode($response->body());
    }
}

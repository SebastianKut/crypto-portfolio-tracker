<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Support\CoinGecko\CoinGecko;
use App\Support\ExchangeRate\ExchangeRate;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    //Moved to Controller as it is used in multiple controllers

    public function getData($currency)
    {
        $transactions = Transaction::getAllTransactions(auth()->user());

        $groupedTransactions = Transaction::groupByCurrencyPair($transactions);

        $tokens = Transaction::getAllTokens($transactions);

        $marketData = CoinGecko::fetchMarketData($currency, $tokens);

        $exchangeRates = ExchangeRate::fetchExchangeRates($currency);

        $indicators = Transaction::getPerformanceIndicators($groupedTransactions, $exchangeRates, $marketData);

        return [
            'transactions'          => $transactions,
            'groupedTransactions'   => $groupedTransactions,
            'tokens'                => $tokens,
            'marketData'            => $marketData,
            'exchangeRates'         => $exchangeRates,
            'indicators'            => $indicators,
        ];
    }
}

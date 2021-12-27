<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Token;
use App\Models\Transaction;
use App\Support\CoinGecko\CoinGecko;
use App\Support\ExchangeRate\ExchangeRate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function create()
    {
        return Inertia::render('Pages-dashboard/TransactionCreate', [
            'tokens' => Token::query()
                ->when(request('searchToken'), function ($query, $search) {
                    $query
                        ->where('symbol', '=', $search);
                })
                ->limit(25)
                ->get('symbol'),
            'currencies' => Currency::query()
                ->when(request('searchCurrency'), function ($query, $search) {
                    $query->where('symbol', 'like', '%' . $search . '%');
                })
                ->limit(10)
                ->get('symbol'),
        ]);
    }

    public function index(Request $request, $currency)
    {
        $transactions = json_decode(Transaction::latest()->where('user_id', auth()->user()->id)->get()->toJson());

        $tokens = array_map(function ($transaction) {
            return $transaction->token_identifier;
        }, $transactions);

        if ($request->query('show') === 'grouped') {

            $transactions = Transaction::groupByCurrencyPair($transactions);
        }

        return Inertia::render('Pages-dashboard/Summary', [
            'transactions'  => $transactions,
            'marketData'    => CoinGecko::fetchMarketData($currency, $tokens),
            'exchangeRates' => ExchangeRate::fetchExchangeRates($currency),
        ]);
    }

    public function store(Request $request)
    {
        Transaction::storeData(Transaction::validateData($request));

        return back()->with("message", "$request->token_symbol transaction was added to your portfolio");
    }
}

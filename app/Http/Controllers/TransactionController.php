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

        $tokens = [];
        foreach ($transactions as $transaction) {
            array_push($tokens, $transaction->token_identifier);
        };

        $marketData = CoinGecko::fetchMarketData($currency, $tokens);

        $exchangeRates = ExchangeRate::fetchExchangeRates($currency);

        if ($request->query('show') === 'all') return Inertia::render('Pages-dashboard/Summary', [
            'transactions'  => $transactions,
            'marketData'    => $marketData,
            'exchangeRates' => $exchangeRates,
        ]);

        if ($request->query('show') === 'grouped') {

            $newTransactions = [];

            foreach ($transactions as $transaction) {
                array_push($newTransactions, (array)$transaction);
            };

            $newTransactionsResult = array_reduce($newTransactions, function ($carry, $item) {
                if (isset($carry[$item['currency_pair']])) {
                    $carry[$item['currency_pair']]['fee_price'] += $item['fee_price'];
                    $carry[$item['currency_pair']]['token_amount'] += $item['token_amount'];
                    $carry[$item['currency_pair']]['total_cost'] += $item['total_cost'];
                    $carry[$item['currency_pair']]['value_price'] += $item['value_price'];
                    $carry[$item['currency_pair']]['unit_cost'] = ($carry[$item['currency_pair']]['total_cost'] / $carry[$item['currency_pair']]['token_amount']);
                } else {
                    $carry[$item['currency_pair']] = $item;
                }
                return $carry;
            });

            $result = [];
            foreach ($newTransactionsResult as $item) {
                array_push($result, (object)$item);
            }

            // dd($result);

            return Inertia::render('Pages-dashboard/Summary', [
                'transactions'  => $result,
                'marketData'    => $marketData,
                'exchangeRates' => $exchangeRates,
            ]);
        }


        return Inertia::render('Pages-dashboard/Summary', [
            'transactions'  => $transactions,
            'marketData'    => $marketData,
            'exchangeRates' => $exchangeRates,
        ]);
    }

    public function store(Request $request)
    {
        Transaction::storeData(Transaction::validateData($request));

        return back()->with("message", "$request->token_symbol transaction was added to your portfolio");
    }
}

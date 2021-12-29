<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Token;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function create()
    {
        $data = $this->getData(auth()->user()->setting->preferred_currency);

        $tokens = Token::query()
            ->when(request('searchToken'), function ($query, $search) {
                $query
                    ->where('symbol', '=', $search);
            })
            ->limit(25)
            ->get('symbol');

        $currencies = Currency::query()
            ->when(request('searchCurrency'), function ($query, $search) {
                $query->where('symbol', 'like', '%' . $search . '%');
            })
            ->limit(10)
            ->get('symbol');

        return Inertia::render('Pages-dashboard/TransactionCreate', [
            'tokens' => $tokens,
            'currencies' => $currencies,
            'indicators' => $data['indicators'],
        ]);
    }

    public function index(Request $request, $currency)
    {
        $data = $this->getData($currency);

        return Inertia::render('Pages-dashboard/Summary', [
            'transactions'  => $request->query('show') === 'grouped' ? $data['groupedTransactions'] : $data['transactions'],
            'marketData'    => $data['marketData'],
            'exchangeRates' => $data['exchangeRates'],
            'indicators'    => $data['indicators'],
        ]);
    }

    public function store(Request $request)
    {
        Transaction::storeData(Transaction::validateData($request));

        return back()->with("message", "$request->token_symbol transaction was added to your portfolio");
    }
}

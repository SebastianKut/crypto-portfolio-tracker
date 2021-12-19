<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Token;
use App\Models\Transaction;
use App\Support\CoinGecko\CoinGecko;
use Illuminate\Http\Request;
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

    public function index()
    {
        //get currency from route request to index() method

        //create array of tokens from transactions collection

        //pass it all to fetchMarketData

        $transactions = Transaction::latest()->get();

        $marketData = CoinGecko::fetchMarketData('usd', ['bitcoin', 'ethereum']);

        return Inertia::render('Pages-dashboard/Summary', [
            'transactions'  => $transactions,
            'marketData'    => $marketData,
        ]);
    }

    public function store(Request $request)
    {
        Transaction::storeData(Transaction::validateData($request));

        return back()->with("message", "$request->token_symbol transaction was added to your portfolio");
    }
}

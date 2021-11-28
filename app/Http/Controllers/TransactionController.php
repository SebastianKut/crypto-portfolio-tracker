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
        return Inertia::render('Pages-dashboard/TransactionCreate', [
            'tokens' => Token::query()
                ->when(request('searchToken'), function ($query, $search) {
                    $query->where('symbol', 'like', '%' . $search . '%');
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

    public function store(Request $request)
    {
        Transaction::storeData(Transaction::validateData($request));

        return back()->with("message", "$request->token_symbol transaction was added to your portfolio");
    }
}

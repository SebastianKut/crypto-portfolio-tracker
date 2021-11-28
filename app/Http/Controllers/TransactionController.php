<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function create()
    {
        return Inertia::render('Pages-dashboard/TransactionCreate');
    }

    public function store(Request $request)
    {
        Transaction::storeData(Transaction::validateData($request));

        $token = strtoupper($request->token_symbol);

        return back()->with("message", "$token transaction was added to your portfolio");
    }
}

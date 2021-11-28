<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function token()
    {
        return $this->belongsTo(Token::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public static function validateData($request)
    {

        return $request->validate([
            'transaction_date'      => ['required', 'date'],
            'exchange'              => ['required', 'string'],
            'token_amount'          => ['required', 'numeric', 'between:0,99999999.99999999'],
            'value_price'           => ['required', 'numeric', 'between:0,999999999.99'],
            'fee_price'             => ['required', 'numeric', 'between:0,999999999.99'],
            'storage_info'          => ['required', 'string'],
            'notes'                 => ['required', 'string'],
            'token_symbol'          => ['required', 'string'],
            'currency_symbol'       => ['required', 'string'],
        ]);
    }

    public static function storeData($validatedData)
    {
        return Transaction::create([
            'transaction_date'      => $validatedData['transaction_date'],
            'exchange'              => $validatedData['exchange'],
            'token_amount'          => $validatedData['token_amount'],
            'value_price'           => $validatedData['value_price'],
            'fee_price'             => $validatedData['fee_price'],
            'storage_info'          => $validatedData['storage_info'],
            'notes'                 => $validatedData['notes'],
            'token_id'              => Token::where('symbol', $validatedData['token_symbol'])->value('id'),
            'currency_id'           => Currency::where('symbol', $validatedData['currency_symbol'])->value('id'),
            'user_id'               => auth()->id(),
        ]);
    }
}

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

    public static function validateData($request)
    {

        return $request->validate([
            'transaction_date'      => ['required', 'date'],
            'exchange'              => ['required', 'string'],
            'token_symbol'          => ['required', 'string', 'max:10'],
            'token_amount'          => ['required', 'between:0,99999999.99999999'],
            'value_price'           => ['required|between:0,999999999.99'],
            'fee_price'             => ['required|between:0,999999999.99'],
            'price_symbol'          => ['required', 'string', 'max:10'],
            'storage_info'          => ['required', 'string'],
            'notes'                 => ['required', 'string'],
        ]);
    }

    public static function storeData($validatedData)
    {
        $validatedData['user_id'] = auth()->id();

        return Transaction::create($validatedData);
    }
}

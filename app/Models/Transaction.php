<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded = [];

    // // Appends accessors to json result so it can be used in react component same way as in blade view
    protected $appends = ['token_name', 'token_symbol', 'token_identifier', 'currency_symbol', 'currency_pair', 'total_cost', 'unit_cost'];

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

    public function getTokenNameAttribute()
    {
        return $this->token->name;
    }

    public function getTokenSymbolAttribute()
    {
        return $this->token->symbol;
    }

    public function getTokenIdentifierAttribute()
    {
        return $this->token->token_id;
    }

    public function getCurrencySymbolAttribute()
    {
        return $this->currency->symbol;
    }

    public function getTotalCostAttribute()
    {
        return $this->attributes['value_price'] + $this->attributes['fee_price'];
    }

    public function getUnitCostAttribute()
    {
        return ($this->attributes['value_price'] + $this->attributes['fee_price']) / $this->attributes['token_amount'];
    }

    public function getCurrencyPairAttribute()
    {
        return $this->token_symbol . $this->currency_symbol;
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

    public static function groupByCurrencyPair($transactions)
    {
        //Change array of objects into array of assoc arrays to be able to use array_reduce and group transactions by currency_pair
        $groupedTransactions = array_map(function ($transaction) {
            return (array) $transaction;
        }, $transactions);

        $newTransactionsResult = array_reduce($groupedTransactions, function ($carry, $item) {
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

        //Turn back into array of objects for React client
        $result = [];

        foreach ($newTransactionsResult as $item) {
            array_push($result, (object)$item);
        }

        return $result;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
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
            'preferred_currency'              => ['required', 'string'],
            'show_transactions'              => ['required', 'string'],
        ]);
    }
}

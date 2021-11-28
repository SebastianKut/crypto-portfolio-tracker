<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;
use File;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Currency::truncate();

        $json = File::get("database/data/currencies.json");

        $currency = json_decode($json);



        foreach ($currency as $symbol) {

            Currency::create([

                "symbol" => $symbol,

            ]);
        }
    }
}

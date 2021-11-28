<?php

namespace Database\Seeders;

use App\Models\Token;
use Illuminate\Database\Seeder;
use File;

class TokenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Token::truncate();

        $json = File::get("database/data/tokens.json");

        $tokens = json_decode($json);



        foreach ($tokens as $key => $value) {

            Token::create([

                "token_id" => $value->id,

                "symbol" => $value->symbol,

                "name" => $value->name,

            ]);
        }
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->date('transaction_date');
            $table->string('exchange');
            $table->string('token_symbol', 10);
            $table->float('token_amount', 16, 8);
            $table->float('value_price', 11, 2);
            $table->float('fee_price', 11, 2);
            $table->string('price_symbol', 10);
            $table->string('storage_info');
            $table->text('notes');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}

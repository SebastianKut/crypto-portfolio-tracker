API calls
coins/markets - for market data by coin and vs_currency includes images

//add modal to display original transaction data (this should have original currencies, notes, storage info, etc)
// add data to graphs and dashboard
//for dashboard query all tokens users transactions then fetch market data for those tokens or fetch 100 biggest tokens ????
//add currency param to dashboard route

//list of tokens from transactions
SELECT name FROM tokens INNER JOIN transactions ON transactions.token_id = tokens.id WHERE user_id = 1

//total cost in reduced array isnt right - investigate why

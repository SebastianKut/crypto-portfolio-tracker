To do
// add modal to display original transaction data (this should have original currencies, notes, storage info, etc) - clickable only when show=all
// add data to graphs and dashboard
//refactor code when finished with functionalities

Notes:
//list of tokens from transactions query
SELECT name FROM tokens INNER JOIN transactions ON transactions.token_id = tokens.id WHERE user_id = 1

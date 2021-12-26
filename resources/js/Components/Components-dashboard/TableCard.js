import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";
import Progress from "@material-tailwind/react/Progress";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import { forEach } from "lodash";

export default function CardTable({ transactions, marketData, exchangeRates }) {
    const { user, show_transactions, preferred_currency } =
        usePage().props.auth;

    const { base_currency } = marketData;

    function findMarketDataByTokenId(tokenId) {
        return marketData.data.find((element) => element.id === tokenId);
    }

    function convertCurrency(fromCurrency, amount) {
        return amount / exchangeRates.rates[fromCurrency.toUpperCase()];
    }

    const handleCurrencyChange = (e) => {
        let currency = e.target.innerText;
        Inertia.get(
            route("summary", {
                currency: currency,
                _query: {
                    show: show_transactions,
                },
            }),
            {},
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    Inertia.patch(
                        route("settings.update", user.id),
                        {
                            preferred_currency: currency,
                            show_transactions: show_transactions,
                        },
                        {
                            preserveScroll: true,
                        }
                    );
                },
            }
        );
    };

    const handleShow = (showPreferrence) => {
        Inertia.get(
            route("summary", {
                currency: preferred_currency,
                _query: {
                    show: showPreferrence,
                },
            }),
            {},
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    Inertia.patch(
                        route("settings.update", user.id),
                        {
                            preferred_currency: preferred_currency,
                            show_transactions: showPreferrence,
                        },
                        {
                            preserveScroll: true,
                        }
                    );
                },
            }
        );
    };
    // ---------------------------------------------------------------
    // //get array of pairs
    // let pairsArr = [];
    // transactions.forEach((transaction) => {
    //     pairsArr.push(transaction.currency_pair);
    // });
    // //reduce array of par to get rid of duplicates
    // let uniquePairsArr = [...new Set(pairsArr)];
    // //loop through array of pairs and for each pair loop through all transactions to find transactions for this pair and sum up values
    // //first transaction found for the pair push into new array of transactions, then next found add the relevant values to the first transaction found
    // let filteredTransactions = [];
    // uniquePairsArr.forEach((pair) => {
    //     let newTransaction = {};
    //     transactions.forEach((transaction) => {
    //         if ((transaction.currency_pair = pair)) {
    //             newTransaction = {
    //                 created_at: transaction.created_at,
    //                 currency_id: transaction.currency_id,
    //                 currency_pair: pair,
    //                 currency_symbol: transaction.currency_symbol,
    //                 fee_price: transaction.fee_price++,
    //                 token_amount: transaction.token_amount++,
    //                 token_id: transaction.token_id,
    //                 token_identifier: transaction.token_identifier,
    //                 token_name: transaction.token_name,
    //                 token_symbol: transaction.token_symbol,
    //                 total_cost: transaction.total_cost++,
    //                 user_id: transaction.user_id,
    //                 value_price: transaction.value_price++,
    //                 unit_cost:
    //                     newTransaction.total_cost /
    //                     newTransaction.token_amount,
    //             };
    //         }
    //     });
    //     filteredTransactions.push(newTransaction);
    // });
    // console.log(filteredTransactions);
    // setTransactionsState([]);
    // -----------------------------------------------------------------------
    return (
        <Card>
            <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Portfolio Details</h2>
                    <Dropdown
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        placement="bottom-start"
                        buttonText="Transactions"
                        size="lg"
                        rounded={false}
                        block={false}
                        ripple="light"
                    >
                        <DropdownItem
                            color="purple"
                            ripple="light"
                            onClick={() => handleShow("all")}
                        >
                            Show all
                        </DropdownItem>
                        <DropdownItem
                            color="purple"
                            ripple="light"
                            onClick={() => handleShow("grouped")}
                        >
                            Group by token
                        </DropdownItem>
                    </Dropdown>
                    <Dropdown
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        placement="bottom-start"
                        buttonText={base_currency.toUpperCase()}
                        size="lg"
                        rounded={false}
                        block={false}
                        ripple="light"
                    >
                        <DropdownItem
                            color="purple"
                            ripple="light"
                            onClick={handleCurrencyChange}
                        >
                            GBP
                        </DropdownItem>
                        <DropdownItem
                            color="purple"
                            ripple="light"
                            onClick={handleCurrencyChange}
                        >
                            USD
                        </DropdownItem>
                        <DropdownItem
                            color="purple"
                            ripple="light"
                            onClick={handleCurrencyChange}
                        >
                            AUD
                        </DropdownItem>
                        <DropdownItem
                            color="purple"
                            ripple="light"
                            onClick={handleCurrencyChange}
                        >
                            PLN
                        </DropdownItem>
                    </Dropdown>
                </div>
            </CardHeader>
            <CardBody>
                <div className="overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Cryptocurrency
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Current Price
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Token Amount
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Total Cost
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Unit Cost
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Total Value
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Gain/Loss
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => {
                                const transactionCurrentMarketData =
                                    findMarketDataByTokenId(
                                        transaction.token_identifier
                                    );

                                return (
                                    <tr key={index}>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            <div className="flex items-stretch">
                                                <div className="w-10 h-10 rounded-full border-2 border-white mr-2">
                                                    <Image
                                                        src={
                                                            transactionCurrentMarketData.image
                                                        }
                                                        rounded
                                                        alt="..."
                                                    />
                                                </div>
                                                <div className="self-center">
                                                    {transaction.token_name}
                                                    <span className="ml-2 text-gray-600">
                                                        {transaction.currency_pair.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {new Intl.NumberFormat("gb-GB", {
                                                style: "currency",
                                                currency: base_currency,
                                            }).format(
                                                transactionCurrentMarketData.current_price
                                            )}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {transaction.token_amount}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>
                                            {new Intl.NumberFormat("gb-GB", {
                                                style: "currency",
                                                currency: base_currency,
                                            }).format(
                                                convertCurrency(
                                                    transaction.currency_symbol,
                                                    transaction.total_cost
                                                )
                                            )}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {new Intl.NumberFormat("gb-GB", {
                                                style: "currency",
                                                currency: base_currency,
                                            }).format(
                                                convertCurrency(
                                                    transaction.currency_symbol,
                                                    transaction.unit_cost
                                                )
                                            )}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {new Intl.NumberFormat("gb-GB", {
                                                style: "currency",
                                                currency: base_currency,
                                            }).format(
                                                transaction.token_amount *
                                                    transactionCurrentMarketData.current_price
                                            )}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {new Intl.NumberFormat("gb-GB", {
                                                style: "currency",
                                                currency: base_currency,
                                            }).format(
                                                transaction.token_amount *
                                                    transactionCurrentMarketData.current_price -
                                                    convertCurrency(
                                                        transaction.currency_symbol,
                                                        transaction.total_cost
                                                    )
                                            )}
                                        </th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    );
}

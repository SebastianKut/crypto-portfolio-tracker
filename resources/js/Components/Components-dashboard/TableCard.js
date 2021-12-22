import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";
import Progress from "@material-tailwind/react/Progress";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";

export default function CardTable({ transactions, marketData, exchangeRates }) {
    const [globalCurrency, setglobalCurrency] = useState(
        marketData.base_currency
    );

    function findMarketDataByTokenId(tokenId) {
        return marketData.data.find((element) => element.id === tokenId);
    }

    function convertCurrency(fromCurrency, amount) {
        return amount / exchangeRates.rates[fromCurrency.toUpperCase()];
    }

    const handleCurrencyChange = (e) => {
        let currency = e.target.innerText;
        Inertia.get(route("summary", currency), {
            preserveScroll: true,
        });
    };

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
                        buttonText={globalCurrency.toUpperCase()}
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
                                                    {`${
                                                        transaction.token_name
                                                    } ${transaction.token_symbol.toUpperCase()}`}
                                                </div>
                                            </div>
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {new Intl.NumberFormat("gb-GB", {
                                                style: "currency",
                                                currency: globalCurrency,
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
                                                currency: globalCurrency,
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
                                                currency: globalCurrency,
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
                                                currency: globalCurrency,
                                            }).format(
                                                transaction.token_amount *
                                                    transactionCurrentMarketData.current_price
                                            )}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {new Intl.NumberFormat("gb-GB", {
                                                style: "currency",
                                                currency: globalCurrency,
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

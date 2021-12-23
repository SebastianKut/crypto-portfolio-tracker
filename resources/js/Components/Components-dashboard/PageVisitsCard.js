import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";
import Button from "@material-tailwind/react/Button";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import millify from "millify";
import { forEach } from "lodash";

export default function PageVisitsCard({ marketData }) {
    const { user } = usePage().props.auth;

    const { base_currency, data } = marketData;

    const formatBigNumbers = (number, currency) => {
        let formatedBigNumber = millify(number);

        let parts = new Intl.NumberFormat("gb-GB", {
            style: "currency",
            currency: currency,
        }).formatToParts(number);

        let currencySymbol = parts.find(
            (part) => part.type === "currency"
        ).value;

        return currencySymbol + formatedBigNumber;
    };

    const handleCurrencyChange = (e) => {
        let currency = e.target.innerText;
        Inertia.get(
            route("dashboard", currency),
            {},
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    Inertia.patch(
                        route("settings.update", user.id),
                        { preferred_currency: currency },
                        {
                            preserveScroll: true,
                        }
                    );
                },
            }
        );
    };

    return (
        <Card>
            <CardHeader color="blue" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Market Data</h2>
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
                                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    #
                                </th>
                                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Cryptocurrency
                                </th>
                                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Price
                                </th>
                                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Market Cap
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((token, index) => {
                                return (
                                    <tr>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {index + 1}
                                        </th>
                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            <div className="flex items-stretch">
                                                <div className="w-10 h-10 rounded-full border-2 border-white mr-2">
                                                    <Image
                                                        src={token.image}
                                                        rounded
                                                        alt="..."
                                                    />
                                                </div>
                                                <div className="self-center">
                                                    {token.name}
                                                    <span className="ml-2 text-gray-600">
                                                        {token.symbol.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {new Intl.NumberFormat("gb-GB", {
                                                style: "currency",
                                                currency: base_currency,
                                            }).format(token.current_price)}
                                        </td>
                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {/* {new Intl.NumberFormat("gb-GB", {
                                                style: "currency",
                                                currency: base_currency,
                                            }).format(token.market_cap)} */}
                                            {/* {millify(token.market_cap)} */}
                                            {formatBigNumbers(
                                                token.market_cap,
                                                base_currency
                                            )}
                                        </td>
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

import { useState, useEffect, useRef } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { useForm, usePage } from "@inertiajs/inertia-react";
import MessageModal from "./MessageModal";
import Popdown from "./Popdown";
import { Inertia } from "@inertiajs/inertia";

export default function SettingsForm() {
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            transaction_date: "",
            exchange: "",
            token_symbol: "",
            token_amount: "",
            value_price: "",
            fee_price: "",
            currency_symbol: "",
            storage_info: "",
            notes: "",
        });
    const { flash, currencies, tokens } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [showTokenPopdown, setShowTokenPopDown] = useState(false);
    const [showCurrencyPopdown, setShowCurrencyPopDown] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("transaction.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setShowModal(true);
                reset();
            },
        });
    };

    const tokenPopdown = useRef();
    const currencyPopdown = useRef();

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                showTokenPopdown &&
                tokenPopdown.current &&
                !tokenPopdown.current.contains(e.target)
            ) {
                setShowTokenPopDown(false);
                setData("token_symbol", "");
            }

            if (
                showCurrencyPopdown &&
                currencyPopdown.current &&
                !currencyPopdown.current.contains(e.target)
            ) {
                setShowCurrencyPopDown(false);
                setData("currency_symbol", "");
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [showTokenPopdown, showCurrencyPopdown]);

    return (
        <Card>
            <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Add Transaction</h2>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={submit}>
                    <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                        Transaction Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="date"
                                color="purple"
                                placeholder="Transaction Date"
                                value={data.transaction_date}
                                onChange={(e) => {
                                    setData("transaction_date", e.target.value);
                                    clearErrors("transaction_date");
                                }}
                                error={errors.transaction_date}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Exchange name"
                                value={data.exchange}
                                onChange={(e) => {
                                    setData("exchange", e.target.value);
                                    clearErrors("exchange");
                                }}
                                error={errors.exchange}
                            />
                        </div>
                    </div>

                    <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
                        Cryptocurrency details
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Token symbol"
                                value={data.token_symbol}
                                onClick={() => setShowTokenPopDown(true)}
                                onChange={(e) => {
                                    setData("token_symbol", e.target.value);
                                    clearErrors("token_symbol");
                                    Inertia.get(
                                        "create",
                                        {
                                            searchToken: e.target.value,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                            replace: true,
                                        }
                                    );
                                    e.target.value === ""
                                        ? setShowTokenPopDown(false)
                                        : setShowTokenPopDown(true);
                                }}
                                error={errors.token_symbol}
                            />
                            {showTokenPopdown && (
                                //functional component cannot be given refs, thats why wrapped in div
                                <div ref={tokenPopdown}>
                                    <Popdown
                                        setData={setData}
                                        dataField={"token_symbol"}
                                        dataSet={tokens}
                                        setShowPopDown={setShowTokenPopDown}
                                        clearErrors={clearErrors}
                                        title="Click token symbol to choose"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Amount"
                                value={data.token_amount}
                                onChange={(e) => {
                                    setData("token_amount", e.target.value);
                                    clearErrors("token_amount");
                                }}
                                error={errors.token_amount}
                            />
                        </div>
                    </div>

                    <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
                        Payment details
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Currency symbol"
                                value={data.currency_symbol}
                                onClick={() => setShowCurrencyPopDown(true)}
                                onChange={(e) => {
                                    setData("currency_symbol", e.target.value);
                                    clearErrors("currency_symbol");
                                    Inertia.get(
                                        "create",
                                        {
                                            searchCurrency: e.target.value,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                            replace: true,
                                        }
                                    );
                                    e.target.value === ""
                                        ? setShowCurrencyPopDown(false)
                                        : setShowCurrencyPopDown(true);
                                }}
                                error={errors.currency_symbol}
                            />
                            {showCurrencyPopdown && (
                                <div ref={currencyPopdown}>
                                    <Popdown
                                        setData={setData}
                                        dataField="currency_symbol"
                                        dataSet={currencies}
                                        setShowPopDown={setShowCurrencyPopDown}
                                        clearErrors={clearErrors}
                                        title="Click currency symbol to choose"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="w-full lg:w-4/12  mb-10 font-light">
                            <Input
                                id="valuePrice"
                                type="text"
                                color="purple"
                                placeholder="Value"
                                value={data.value_price}
                                onChange={(e) => {
                                    setData("value_price", e.target.value);
                                    clearErrors("value_price");
                                }}
                                error={errors.value_price}
                            />
                        </div>
                        <div className="w-full lg:w-4/12  pl-4 mb-10 font-light">
                            <Input
                                id="feePaid"
                                type="text"
                                color="purple"
                                placeholder="Fee paid"
                                value={data.fee_price}
                                onChange={(e) => {
                                    setData("fee_price", e.target.value);
                                    clearErrors("fee_price");
                                }}
                                success={
                                    (data.value_price || data.fee_price) &&
                                    `Total price paid: ${
                                        +data.value_price + +data.fee_price
                                    } ${data.currency_symbol.toUpperCase()}`
                                }
                                error={errors.fee_price}
                            />
                        </div>
                    </div>

                    <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
                        Additional Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-12/12 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Storage Information"
                                value={data.storage_info}
                                onChange={(e) => {
                                    setData("storage_info", e.target.value);
                                    clearErrors("storage_info");
                                }}
                                error={errors.storage_info}
                            />
                        </div>
                        <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
                            <Textarea
                                color="purple"
                                placeholder="Notes"
                                value={data.notes}
                                onChange={(e) => {
                                    setData("notes", e.target.value);
                                    clearErrors("notes");
                                }}
                                error={errors.notes}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="font-light">
                            <Button
                                color="purple"
                                buttonType="filled"
                                size="lg"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                                disabled={processing}
                            >
                                Add to portfolio
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
            <MessageModal
                showModal={showModal}
                setShowModal={setShowModal}
                message={flash.message}
            />
        </Card>
    );
}

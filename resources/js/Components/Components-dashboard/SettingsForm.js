import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { Link } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import { useState } from "react";

export default function SettingsForm() {
    const { data, setData, post, processing, errors } = useForm({
        transaction_date: "",
        exchange: "",
        token_symbol: "",
        token_amount: "",
        value_price: "",
        fee_price: "",
        price_symbol: "",
        storage_info: "",
        notes: "",
    });

    const [totalPrice, setTotalPrice] = useState(0);

    function updatePrices(e) {
        if (e.target.id === "valuePrice")
            setData("value_price", e.target.value);
        if (e.target.id === "feePaid") setData("fee_price", e.target.value);
        setTotalPrice(+data.value_price + +data.fee_price);
    }

    function submit(e) {
        e.preventDefault();
        post(route("transaction.store"));
    }
    return (
        <Card>
            <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Add Transaction</h2>
                    {/* <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        style={{ padding: 0 }}
                    >
                        Settings
                    </Button> */}
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
                                onChange={(e) =>
                                    setData("transaction_date", e.target.value)
                                }
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Exchange name"
                                value={data.exchange}
                                onChange={(e) =>
                                    setData("exchange", e.target.value)
                                }
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
                                onChange={(e) =>
                                    setData("token_symbol", e.target.value)
                                }
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Amount"
                                value={data.token_amount}
                                onChange={(e) =>
                                    setData("token_amount", e.target.value)
                                }
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
                                value={data.price_symbol}
                                onChange={(e) =>
                                    setData("price_symbol", e.target.value)
                                }
                                success={`Total price: ${totalPrice}`}
                            />
                        </div>
                        <div className="w-full lg:w-4/12  mb-10 font-light">
                            <Input
                                id="valuePrice"
                                type="text"
                                color="purple"
                                placeholder="Price paid"
                                value={data.value_price}
                                onChange={(e) => updatePrices(e)}
                                // onChange={(e) =>
                                //     setData("value_price", e.target.value)
                                // }
                            />
                        </div>
                        <div className="w-full lg:w-4/12  pl-4 mb-10 font-light">
                            <Input
                                id="feePaid"
                                type="text"
                                color="purple"
                                placeholder="Fee paid"
                                value={data.fee_price}
                                onChange={(e) => updatePrices(e)}
                                // onChange={(e) =>
                                //     setData("fee_price", e.target.value)
                                // }
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
                                onChange={(e) =>
                                    setData("storage_info", e.target.value)
                                }
                            />
                        </div>
                        <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
                            <Textarea
                                color="purple"
                                placeholder="Notes"
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    {/* <div className="flex flex-wrap mt-10 font-light"></div>
                    <div className="w-full lg:w-12/12 pl-4 mb-10 font-light">
                        <Input
                            type="text"
                            color="purple"
                            placeholder="Postal Code"
                        />
                    </div> */}
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
                            >
                                Submit transaction
                                {/* <Link href="#" as="button" type="submit">
                                    Submit transaction
                                </Link> */}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}

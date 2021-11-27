import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { Link } from "@inertiajs/inertia-react";

export default function SettingsForm() {
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
                <form>
                    <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                        Transaction Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="date"
                                color="purple"
                                placeholder="Transaction Date"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Exchange name"
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
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Amount"
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
                                // success="Total price: 20,45"
                            />
                        </div>
                        <div className="w-full lg:w-4/12  mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Price paid"
                            />
                        </div>
                        <div className="w-full lg:w-4/12  pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Fee paid"
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
                            />
                        </div>
                        <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
                            <Textarea color="purple" placeholder="Notes" />
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
                                <Link
                                    href="#"
                                    method="post"
                                    as="button"
                                    type="submit"
                                >
                                    Submit transaction
                                </Link>
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}

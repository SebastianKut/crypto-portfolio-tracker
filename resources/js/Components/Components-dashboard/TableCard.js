import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";
import Progress from "@material-tailwind/react/Progress";
import Team1 from "../../../../public/img/team-1-800x800.jpg";
import Team2 from "../../../../public/img/team-2-800x800.jpg";
import Team3 from "../../../../public/img/team-3-800x800.jpg";
import Team4 from "../../../../public/img/team-4-470x470.png";

export default function CardTable({ transactions }) {
    return (
        <Card>
            <CardHeader color="purple" contentPosition="left">
                <h2 className="text-white text-2xl">Portfolio Details</h2>
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
                                return (
                                    <tr key={index}>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            <div className="flex items-stretch">
                                                <div className="w-10 h-10 rounded-full border-2 border-white mr-2">
                                                    <Image
                                                        src={Team1}
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
                                            {transaction.token_amount}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>
                                            {new Intl.NumberFormat("gb-GB", {
                                                style: "currency",
                                                currency:
                                                    transaction.currency_symbol,
                                            }).format(transaction.total_cost)}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {new Intl.NumberFormat("gb-GB", {
                                                style: "currency",
                                                currency:
                                                    transaction.currency_symbol,
                                            }).format(transaction.unit_cost)}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            $2.3M
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            $2.21M
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

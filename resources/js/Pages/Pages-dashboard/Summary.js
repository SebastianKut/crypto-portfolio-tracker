import StatusCard from "@/Components/Components-dashboard/StatusCard";
import TableCard from "@/Components/Components-dashboard/TableCard";
import Authenticated from "@/Layouts/Layouts-dashboard/Authenticated";
import { Head } from "@inertiajs/inertia-react";

export default function Summary({
    transactions,
    marketData,
    exchangeRates,
    indicators,
}) {
    const { roi, total_cost, total_value, total_gain } = indicators;

    const { base_currency } = marketData;

    return (
        <Authenticated>
            <Head title="Summary" />
            <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                        <StatusCard
                            color="orange"
                            icon="trending_up"
                            title="Total Value"
                            amount={
                                total_value &&
                                new Intl.NumberFormat("gb-GB", {
                                    style: "currency",
                                    currency: base_currency,
                                    currencyDisplay: "code",
                                }).format(total_value)
                            }
                            percentage="3.48%"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last week"
                        />
                        <StatusCard
                            color="pink"
                            icon="payment"
                            title="Cost"
                            amount={
                                total_cost &&
                                new Intl.NumberFormat("gb-GB", {
                                    style: "currency",
                                    currency: base_currency,
                                    currencyDisplay: "code",
                                }).format(total_cost)
                            }
                            percentage="3.48%"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="Since last week"
                        />
                        <StatusCard
                            color="purple"
                            icon="paid"
                            title="Gain/Loss"
                            amount={
                                total_gain &&
                                new Intl.NumberFormat("gb-GB", {
                                    style: "currency",
                                    currency: base_currency,
                                    currencyDisplay: "code",
                                }).format(total_gain)
                            }
                            percentage="1.10%"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="Since last week"
                        />
                        <StatusCard
                            color="blue"
                            icon="poll"
                            title="ROI"
                            amount={
                                roi &&
                                new Intl.NumberFormat("gb-GB", {
                                    style: "percent",
                                }).format(roi)
                            }
                            percentage="12%"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last week"
                        />
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 mb-16">
                        <TableCard
                            transactions={transactions}
                            marketData={marketData}
                            exchangeRates={exchangeRates}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

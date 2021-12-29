import { usePage } from "@inertiajs/inertia-react";
import StatusCard from "@/Components/Components-dashboard/StatusCard";
import ChartLine from "@/Components/Components-dashboard/ChartLine";
import ChartBar from "@/Components/Components-dashboard/ChartBar";
import PageVisitsCard from "@/Components/Components-dashboard/PageVisitsCard";
import TrafficCard from "@/Components/Components-dashboard/TrafficCard";
import Authenticated from "@/Layouts/Layouts-dashboard/Authenticated";
import { Head } from "@inertiajs/inertia-react";

export default function Dashboard({ marketData, exchangeRates, indicators }) {
    const { roi, total_cost, total_value, total_gain } = indicators;
    const { base_currency } = marketData;

    return (
        <Authenticated>
            <Head title="Dashboard" />

            <div className="bg-light-blue-500 px-3 md:px-8 h-40" />

            <div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <ChartLine />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <ChartBar />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                        <StatusCard
                            color="orange"
                            icon="trending_up"
                            title="Total Value"
                            amount={new Intl.NumberFormat("gb-GB", {
                                style: "currency",
                                currency: base_currency,
                                currencyDisplay: "code",
                            }).format(total_value)}
                            percentage="3.48%"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last week"
                        />
                        <StatusCard
                            color="pink"
                            icon="payment"
                            title="Cost"
                            amount={new Intl.NumberFormat("gb-GB", {
                                style: "currency",
                                currency: base_currency,
                                currencyDisplay: "code",
                            }).format(total_cost)}
                            percentage="3.48%"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="Since last week"
                        />
                        <StatusCard
                            color="purple"
                            icon="paid"
                            title="Gain/Loss"
                            amount={new Intl.NumberFormat("gb-GB", {
                                style: "currency",
                                currency: base_currency,
                                currencyDisplay: "code",
                            }).format(total_gain)}
                            percentage="1.10%"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="Since last week"
                        />
                        <StatusCard
                            color="blue"
                            icon="poll"
                            title="ROI"
                            amount={new Intl.NumberFormat("gb-GB", {
                                style: "percent",
                            }).format(roi)}
                            percentage="12%"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last week"
                        />
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-8 px-4 mb-14">
                            <PageVisitsCard
                                marketData={marketData}
                                exchangeRates={exchangeRates}
                            />
                        </div>
                        {/* <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <TrafficCard />
                        </div> */}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

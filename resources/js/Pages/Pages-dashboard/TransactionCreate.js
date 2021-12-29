import { usePage } from "@inertiajs/inertia-react";
import StatusCard from "@/Components/Components-dashboard/StatusCard";
import SettingsForm from "@/Components/Components-dashboard/SettingsForm";
import ProfileCard from "@/Components/Components-dashboard/ProfileCard";
import Authenticated from "@/Layouts/Layouts-dashboard/Authenticated";
import { Head } from "@inertiajs/inertia-react";

export default function TransactionCreate({ indicators }) {
    const { roi, total_cost, total_value, total_gain } = indicators;

    const { preferred_currency } = usePage().props.auth;

    console.log(preferred_currency);
    return (
        <Authenticated>
            <Head title="Dashboard" />
            <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                        <StatusCard
                            color="orange"
                            icon="trending_up"
                            title="Total Value"
                            amount={new Intl.NumberFormat("gb-GB", {
                                style: "currency",
                                currency: preferred_currency,
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
                                currency: preferred_currency,
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
                                currency: preferred_currency,
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

            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-6">
                        <div className="xl:col-start-2 xl:col-end-6 px-4 mb-16">
                            <SettingsForm />
                        </div>
                        {/* <div className="xl:col-start-5 xl:col-end-7 px-4 mb-16 mt-14">
                            <ProfileCard />
                        </div> */}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

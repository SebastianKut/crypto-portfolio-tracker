import StatusCard from "@/Components/Components-dashboard/StatusCard";
import ChartLine from "@/Components/Components-dashboard/ChartLine";
import ChartBar from "@/Components/Components-dashboard/ChartBar";
import PageVisitsCard from "@/Components/Components-dashboard/PageVisitsCard";
import TrafficCard from "@/Components/Components-dashboard/TrafficCard";
import Authenticated from "@/Layouts/Layouts-dashboard/Authenticated";
import { Head } from "@inertiajs/inertia-react";

export default function Dashboard() {
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
                            amount="350,897"
                            percentage="3.48%"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last week"
                        />
                        <StatusCard
                            color="pink"
                            icon="payment"
                            title="Cost"
                            amount="2,356"
                            percentage="3.48%"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="Since last week"
                        />
                        <StatusCard
                            color="purple"
                            icon="paid"
                            title="Gain/Loss"
                            amount="924"
                            percentage="1.10%"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="Since last week"
                        />
                        <StatusCard
                            color="blue"
                            icon="poll"
                            title="ROI"
                            amount="49,65%"
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
                            <PageVisitsCard />
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
import { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import AdminNavbar from "./AdminNavbar";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState("-left-64");

    const { preferred_currency, show_transactions } = usePage().props.auth;

    return (
        <>
            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <a
                        href="https://sebastiankut.com"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block"
                    >
                        <H6 color="gray">Portfolio Tracker</H6>
                    </a>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4">
                                <Link
                                    href={route(
                                        "dashboard",
                                        preferred_currency
                                    )}
                                    exact
                                    className={`flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg ${
                                        route().current("dashboard") &&
                                        "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    }`}
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Dashboard
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2">
                                <Link
                                    href={route("add transaction")}
                                    className={`flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg ${
                                        route().current("add transaction") &&
                                        "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    }`}
                                >
                                    <Icon name="settings" size="2xl" />
                                    Add transaction
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2 ">
                                <Link
                                    href={route("summary", {
                                        currency: preferred_currency,
                                        _query: {
                                            show: show_transactions,
                                        },
                                    })}
                                    className={`flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg ${
                                        route().current("summary") &&
                                        "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    }`}
                                >
                                    <Icon name="toc" size="2xl" />
                                    Summary
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

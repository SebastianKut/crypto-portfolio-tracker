import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import Sidebar from "@/Components/Components-dashboard/Sidebar";
import Footer from "@/Components/Components-dashboard/Footer";

export default function Authenticated({ children }) {
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
}

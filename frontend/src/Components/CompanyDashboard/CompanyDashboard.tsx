import { Outlet } from "react-router";
import React from "react";
import './CompanyDashboard.css'

type Props = {
    children: React.ReactNode;
    ticker: string;
}

const CompanyDashboard = ({ children, ticker }: Props) => {
    return (
        <div className="dashboard-container">
            <div className="content-container">
                <div className="children-container">
                    {children}
                </div>
                <div className="outlet-container">
                    <Outlet context={ticker}/>
                </div>
            </div>
        </div>
    );
}

export default CompanyDashboard;

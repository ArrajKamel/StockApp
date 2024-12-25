import {CompanyBalanceSheet} from "../../company";
import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBalanceSheet} from "../../api.tsx";
import RatioList from "../RatioList/RatioList.tsx";

const config = [
    {
        label: <div className="font-bold">Total Assets</div>,
        render: (company: CompanyBalanceSheet) => company.totalAssets,
    },
    {
        label: "Current Assets",
        render: (company: CompanyBalanceSheet) => company.totalCurrentAssets,
    },
    {
        label: "Total Cash",
        render: (company: CompanyBalanceSheet) => company.cashAndCashEquivalents,
    },
    {
        label: "Property & equipment",
        render: (company: CompanyBalanceSheet) => company.propertyPlantEquipmentNet,
    },
    {
        label: "Intangible Assets",
        render: (company: CompanyBalanceSheet) => company.intangibleAssets,
    },
    {
        label: "Long Term Debt",
        render: (company: CompanyBalanceSheet) => company.longTermDebt,
    },
    {
        label: "Total Debt",
        render: (company: CompanyBalanceSheet) => company.otherCurrentLiabilities,
    },
    {
        label: <div className="font-bold">Total Liabilites</div>,
        render: (company: CompanyBalanceSheet) => company.totalLiabilities,
    },
    {
        label: "Current Liabilities",
        render: (company: CompanyBalanceSheet) => company.totalCurrentLiabilities,
    },
    {
        label: "Long-Term Debt",
        render: (company: CompanyBalanceSheet) => company.longTermDebt,
    },
    {
        label: "Long-Term Income Taxes",
        render: (company: CompanyBalanceSheet) => company.otherLiabilities,
    },
    {
        label: "Stakeholder's Equity",
        render: (company: CompanyBalanceSheet) => company.totalStockholdersEquity,
    },
    {
        label: "Retained Earnings",
        render: (company: CompanyBalanceSheet) => company.retainedEarnings,
    },
];
const BalanceSheet = () => {
    const ticker = useOutletContext<string>();
    const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet>();// for tables, CompanyBalanceSheet must be an array but here am gonna build it with tials
    useEffect(() => {
        const getData = async () => {
            const result = await getBalanceSheet(ticker);
            setBalanceSheet(result?.data[0]);// for table, you pass data?.data (the entire array)
        }
        getData();
    }, [])
    return (
        <>
            {balanceSheet ? (
                <RatioList config={config} data={balanceSheet}/>
            ):(
                <>Company Not Found!</>
            )
            }
        </>
    );
}

export default BalanceSheet;
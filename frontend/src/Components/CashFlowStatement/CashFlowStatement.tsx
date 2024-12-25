import {CompanyCashFlow} from "../../company";
import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCashFlowStatement} from "../../api.tsx";
import Table from "../Table/Table.tsx";

const config = [
    {
        label: "Date",
        render: (company: CompanyCashFlow) => company.date,
    },
    {
        label: "Operating Cashflow",
        render: (company: CompanyCashFlow) => company.operatingCashFlow,
    },
    {
        label: "Investing Cashflow",
        render: (company: CompanyCashFlow) =>
            company.netCashUsedForInvestingActivites,
    },
    {
        label: "Financing Cashflow",
        render: (company: CompanyCashFlow) =>
            company.netCashUsedProvidedByFinancingActivities,
    },
    {
        label: "Cash At End of Period",
        render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
    },
    {
        label: "CapEX",
        render: (company: CompanyCashFlow) => company.capitalExpenditure,
    },
    {
        label: "Issuance Of Stock",
        render: (company: CompanyCashFlow) => company.commonStockIssued,
    },
    {
        label: "Free Cash Flow",
        render: (company: CompanyCashFlow) => company.freeCashFlow,
    },
];


const CashFlowStatement = () => {
    const ticker = useOutletContext<string>();
    const [cashFlowStatement, setCashFlowStatement] = useState<CompanyCashFlow[]>();

    useEffect(() => {
        const getRatios = async () => {
            const result = await getCashFlowStatement(ticker!);
            setCashFlowStatement(result!.data);
        }
        getRatios()
    }, []);
    return (
        <>
            {cashFlowStatement ? (
                <Table data={cashFlowStatement} config={config}></Table>
            ):(
                <>Company Noy Found!</>
            )
            }
        </>
    )
}

export default CashFlowStatement;
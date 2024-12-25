import {CompanyIncomeStatement} from "../../company";
import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {getIncomeStatement} from "../../api.tsx";
import Table from "../Table/Table.tsx";

const configs = [
    {
        label: "Date",
        render: (company: CompanyIncomeStatement) => company.date,
    },
    {
        label: "Revenue",
        render: (company: CompanyIncomeStatement) => company.revenue,
    },
    {
        label: "Cost Of Revenue",
        render: (company: CompanyIncomeStatement) => company.costOfRevenue,
    },
    {
        label: "Depreciation",
        render: (company: CompanyIncomeStatement) =>
            company.depreciationAndAmortization,
    },
    {
        label: "Operating Income",
        render: (company: CompanyIncomeStatement) => company.operatingIncome,
    },
    {
        label: "Income Before Taxes",
        render: (company: CompanyIncomeStatement) => company.incomeBeforeTax,
    },
    {
        label: "Net Income",
        render: (company: CompanyIncomeStatement) => company.netIncome,
    },
    {
        label: "Net Income Ratio",
        render: (company: CompanyIncomeStatement) => company.netIncomeRatio,
    },
    {
        label: "Earnings Per Share",
        render: (company: CompanyIncomeStatement) => company.eps,
    },
    {
        label: "Earnings Per Diluted",
        render: (company: CompanyIncomeStatement) => company.epsdiluted,
    },
    {
        label: "Gross Profit Ratio",
        render: (company: CompanyIncomeStatement) => company.grossProfitRatio,
    },
    {
        label: "Opearting Income Ratio",
        render: (company: CompanyIncomeStatement) => company.operatingIncomeRatio,
    },
    {
        label: "Income Before Taxes Ratio",
        render: (company: CompanyIncomeStatement) => company.incomeBeforeTaxRatio,
    },
];
const IncomeStatement = ()  =>{
    const ticker = useOutletContext<string>();
    const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>();
    useEffect(() => {
        const incomeStatementFetch = async () => {
            const result = await getIncomeStatement(ticker);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setIncomeStatement(result?.data);
        }
        incomeStatementFetch();
    }, []);

    return (
        <>
            {incomeStatement ? (
                <>
                    <Table config={configs} data={incomeStatement} />
                </>
            ): (
                <>
                    ...loading
                </>
            )
            }
        </>
    )
}

export default IncomeStatement;
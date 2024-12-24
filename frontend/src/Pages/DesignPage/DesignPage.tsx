import Table from "../../Components/Table/Table.tsx";
import RatioList from "../../Components/RatioList/RatioList.tsx";
import {CompanyKeyMetrics} from "../../company";
import {testIncomeStatementData} from "../../Components/Table/testData.tsx";

const tableConfig = [
    {
        label: "Market Cap",
        render: (company: CompanyKeyMetrics) => company.marketCapTTM,
        subTitle: "Total value of all a company's shares of stock",
    },
]

const DesignPage = () => {
    return (
        <>
            <h1>KamelArraj Design Page</h1>
            <h2>
                this is KamelArraj's design page. This is where we well house var' design aspects of the app
            </h2>
            <RatioList data={testIncomeStatementData} config={tableConfig} />
            <Table config={tableConfig} data={testIncomeStatementData} />
        </>
    );
}

export default DesignPage;
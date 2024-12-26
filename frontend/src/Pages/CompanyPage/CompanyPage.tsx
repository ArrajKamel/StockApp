import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CompanyProfile} from "../../company";
import {getCompanyProfile} from "../../api.tsx";
import Sidebar from "../../Components/Sidebar/Sidebar.tsx";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tail from "../../Components/Tail/Tail.tsx"
import "./CompanyPage.css"
import Spinner from "../../Components/Spinner/Spinner.tsx";
import CompFinder from "../../Components/CompFinder/CompFinder.tsx";
import TenKFinder from "../../Components/TenKFinder/TenKFinder.tsx";

const CompanyPage = () => {

    const { ticker } = useParams();
    const [company, setCompany] = useState<CompanyProfile>();

    //be careful with useEffect
    useEffect(() => {
        const getProfileInit = async () => {
            const result = await getCompanyProfile(ticker!);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setCompany(result?.data[0]);
        }
        getProfileInit();
    }, [])
    return (
    <>
        {company ? (
            <div className="page-layout">
                <div>
                    <Sidebar/>
                </div>

                <div className="card-tail-container">
                    <CompanyDashboard ticker={ticker!} >
                        <Tail title="Company Name" subtitle={company.companyName}/>
                        <Tail title="Price" subtitle={company.price.toString()}/>
                        <Tail title="Sector" subtitle={company.sector}/>
                        <Tail title="DCF" subtitle={company.dcf.toString()}/>

                        <CompFinder ticker={company.symbol} />
                        <TenKFinder ticker={company.symbol} />

                        <p className="company-description">
                            {company.description}
                        </p>
                    </CompanyDashboard>
                </div>
            </div>
        ) : (
            <Spinner />
        )
        };
    </>
    );
}

export default CompanyPage;
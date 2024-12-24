import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CompanyProfile} from "../../company";
import {getCompanyProfile} from "../../api.tsx";
import Sidebar from "../../Components/Sidebar/Sidebar.tsx";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tail from "../../Components/Tail/Tail.tsx"
import "./CompanyPage.css"

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
                <div className="sidebar">
                    <Sidebar/>
                </div>

                <div className="tail-container">
                    <CompanyDashboard ticker={ticker!} >
                        <Tail title="Company Name" subtitle={company.companyName}/>
                        <Tail title="Company Name" subtitle={company.companyName}/>
                    </CompanyDashboard>
                </div>
            </div>
        ) : (
            <div>Company Not Found!</div>
        )
        };
    </>
    );
}

export default CompanyPage;
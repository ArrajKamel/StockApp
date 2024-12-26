import {CompanyTenK} from "../../company";
import {useEffect, useState} from "react";
import {getTenK} from "../../api.tsx";
import Spinner from "../Spinner/Spinner.tsx";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem.tsx";

type Props = {
    ticker: string;
}

const TenKFinder = ({ ticker }: Props) => {
    const [companyData, setCompanyData] = useState<CompanyTenK[]>([]);
    useEffect(() => {
         const getTenKData = async () => {
             const result = await getTenK(ticker!)
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             // @ts-expect-error
             setCompanyData(result?.data);
         }
        getTenKData();
    }, [ticker]);

    return (
        <div className="finder-container" role="group">
            {companyData ? (
                companyData?.slice(0, 5).map((tenK) =>{
                    return <TenKFinderItem tenK={tenK} />;
                })
            ):(
                <Spinner />
            )}
        </div>
    );
}

export default TenKFinder;
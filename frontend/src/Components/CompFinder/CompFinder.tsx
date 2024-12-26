import { useEffect, useState } from "react";
import { CompanyCompData } from "../../company";
import { getCompData } from "../../api.tsx";
import CompFinderItem from "./CompFinderItem/CompFinderItem.tsx";
//////////////////////////////////////////////////////////////////
// this component needs a paid subscription in the api to get working
//////////////////////////////////////////////////////////////////
type Props = {
    ticker: string;
};

const CompFinder = ({ ticker }: Props) => {
    const [companyData, setCompanyData] = useState<CompanyCompData>();

    useEffect(() => {
        const getComps = async () => {
            const result = await getCompData(ticker!);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setCompanyData(result?.data[0]);
        };
        getComps();
    }, [ticker]);

    return (
        <div className="comp-finder-container">
            {companyData?.peersList.map((ticker) => {
                return <CompFinderItem ticker={ticker} />;
            })};
        </div>
    );
};

export default CompFinder;

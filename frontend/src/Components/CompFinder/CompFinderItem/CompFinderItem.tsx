import { Link } from "react-router-dom";

type Props = {
    ticker: string;
};

const CompFinderItem = ({ ticker }: Props) => {
    return (
        <Link
            reloadDocument
            to={`/company/${ticker}/company-profile`}
            type="button"
            className="comp-finder-item dark"
        >
            {ticker}
        </Link>
    );
};

export default CompFinderItem;

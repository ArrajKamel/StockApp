import "./Card.css";
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio.tsx";
import { SyntheticEvent } from "react";
import {Link} from "react-router";

interface Props {
    id: string;
    searchResult: CompanySearch;
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({ id, searchResult, onPortfolioCreate }: Props): JSX.Element => {
    return (
        <div className="card" key={id} id={id}>
            <Link to={`/company/${searchResult.symbol}/company-profile`}>
                {searchResult.name} ({searchResult.symbol})
            </Link>
            <p>{searchResult.currency}</p>
            <p className="exchange-info">
                {searchResult.exchangeShortName} - {searchResult.stockExchange}
            </p>
            <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={searchResult.symbol} />
        </div>
    );
};

export default Card;

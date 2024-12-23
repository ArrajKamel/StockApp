import { SyntheticEvent } from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio.tsx";
import "./CardPortfolio.css";
import {Link} from "react-router";

interface Props {
    portfolioValue: string;
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const CardPortfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
    return (
        <div className="card-portfolio">
            <Link to={`/company/${portfolioValue}`}>{portfolioValue}</Link>
            <DeletePortfolio
                portfolioValue={portfolioValue}
                onPortfolioDelete={onPortfolioDelete}
            />
        </div>
    );
};

export default CardPortfolio;

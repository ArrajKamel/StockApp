import React, { SyntheticEvent } from "react";
import "./DeletePortfolio.css";

interface Props {
    onPortfolioDelete: (e: SyntheticEvent) => void;
    portfolioValue: string;
}

const DeletePortfolio: React.FC<Props> = ({ onPortfolioDelete, portfolioValue }) => {
    return (
        <div>
            <form onSubmit={onPortfolioDelete}>
                <input hidden={true} value={portfolioValue} />
                <button className="delete-portfolio-button">
                    X
                </button>
            </form>
        </div>
    );
};

export default DeletePortfolio;

import React, { SyntheticEvent } from "react";
import CardPortfolio from "../CardPortfolio/CardPortfolio.tsx";
import "./PortfolioList.css";

interface Props {
    portfolioValues: string[];
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const PortfolioList: React.FC<Props> = ({ portfolioValues, onPortfolioDelete }: Props) => {
    return (
        <section id="portfolio">
            <div className="text-container">
                <h2 className="portfolio-title">My Portfolio</h2>
                <div className="container">
                    {portfolioValues.length > 0 ? (
                        portfolioValues.map((portfolioValue) => {
                            return (
                                <CardPortfolio
                                    key={portfolioValue}
                                    portfolioValue={portfolioValue}
                                    onPortfolioDelete={onPortfolioDelete}
                                />
                            );
                        })
                    ) : (
                        <h3 className="empty-portfolio-message">
                            Your portfolio is empty.
                        </h3>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PortfolioList;

import React from 'react';
import Card from '../Card/Card';
import './cardList.css';
import { CompanySearch } from "../../company";
import { v4 as uuidv4 } from 'uuid';
import { SyntheticEvent } from "react";

interface Props {
    searchResults: CompanySearch[];
    onPortfolioCreate: (e: SyntheticEvent) => void;
};

const CardList: React.FC<Props> = ({ searchResults, onPortfolioCreate }: Props): JSX.Element => {
    return (
        <div className="card-list-container">
            {searchResults.length > 0 ? (
                searchResults.map((result) => {
                    return (
                        <Card
                            id={result.symbol}
                            key={uuidv4()}
                            searchResult={result}
                            onPortfolioCreate={onPortfolioCreate}
                        />
                    );
                })
            ) : (
                <p className="no-results">
                    No results!
                </p>
            )}
        </div>
    );
};

export default CardList;